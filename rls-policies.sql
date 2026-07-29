-- ========================================
-- RLS WRITE POLICIES
-- Run this in the Supabase SQL editor AFTER backup.sql.
-- Safe to re-run anytime (uses DROP IF EXISTS before each CREATE).
-- ========================================

-- ---- Admin-only write access (projects, certificates, tech_stack) ----

DROP POLICY IF EXISTS "Allow authenticated write projects" ON public.projects;
CREATE POLICY "Allow authenticated write projects"
ON public.projects FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated write certificates" ON public.certificates;
CREATE POLICY "Allow authenticated write certificates"
ON public.certificates FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated write tech_stack" ON public.tech_stack;
CREATE POLICY "Allow authenticated write tech_stack"
ON public.tech_stack FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Admin can pin/reply/delete comments; anonymous visitors cannot.
DROP POLICY IF EXISTS "Allow authenticated manage comments" ON public.comments;
CREATE POLICY "Allow authenticated manage comments"
ON public.comments FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- ---- Public "like a comment" button ----
-- Anonymous visitors are NOT given direct UPDATE access to comments
-- (that would let them edit/pin/forge anything, not just likes).
-- Instead, this function only ever touches the likes column,
-- and is the ONLY way an anonymous visitor can change a comment row.

CREATE OR REPLACE FUNCTION public.increment_comment_like(comment_id bigint)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_likes integer;
BEGIN
  UPDATE public.comments
  SET likes = likes + 1
  WHERE id = comment_id
  RETURNING likes INTO new_likes;

  RETURN new_likes;
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_comment_like(bigint) TO anon, authenticated;

-- ---- Storage bucket policies (uploads) ----

DROP POLICY IF EXISTS "Allow authenticated upload projects bucket" ON storage.objects;
CREATE POLICY "Allow authenticated upload projects bucket"
ON storage.objects FOR ALL
USING (bucket_id = 'projects' AND auth.role() = 'authenticated')
WITH CHECK (bucket_id = 'projects' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated upload certificates bucket" ON storage.objects;
CREATE POLICY "Allow authenticated upload certificates bucket"
ON storage.objects FOR ALL
USING (bucket_id = 'certificates' AND auth.role() = 'authenticated')
WITH CHECK (bucket_id = 'certificates' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated upload tech-stack bucket" ON storage.objects;
CREATE POLICY "Allow authenticated upload tech-stack bucket"
ON storage.objects FOR ALL
USING (bucket_id = 'tech-stack' AND auth.role() = 'authenticated')
WITH CHECK (bucket_id = 'tech-stack' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow public read projects bucket" ON storage.objects;
CREATE POLICY "Allow public read projects bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'projects');

DROP POLICY IF EXISTS "Allow public read certificates bucket" ON storage.objects;
CREATE POLICY "Allow public read certificates bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'certificates');

DROP POLICY IF EXISTS "Allow public read tech-stack bucket" ON storage.objects;
CREATE POLICY "Allow public read tech-stack bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'tech-stack');

DROP POLICY IF EXISTS "Allow public upload comments bucket" ON storage.objects;
CREATE POLICY "Allow public upload comments bucket"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'comments');

DROP POLICY IF EXISTS "Allow public read comments bucket" ON storage.objects;
CREATE POLICY "Allow public read comments bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'comments');
