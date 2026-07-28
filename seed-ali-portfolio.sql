-- ========================================
-- SEED DATA: Ali Haider's projects + tech stack
-- Run this in the Supabase SQL editor AFTER backup.sql has created the schema.
-- Image paths point at files already bundled in /public/assets/ali/projects,
-- so no Supabase Storage upload is required for these to display.
-- ========================================

-- ---- PROJECTS (shown in the "Other Projects" / admin-managed showcase) ----

INSERT INTO public.projects (title, description, live_url, github_url, technologies, key_features, image_url, image_urls)
VALUES
(
  'NOVA AI Assistant',
  'My first attempt at building an AI assistant in Python. NOVA is a terminal-based assistant powered by a locally running language model. Building it taught me how AI assistants process prompts, route commands, and where simple architectures begin to break down. Many of the lessons learned while building NOVA later influenced the design decisions behind JARVIS.',
  NULL,
  NULL,
  ARRAY['Python', 'Ollama', 'Local LLMs', 'Prompt Processing'],
  ARRAY['Terminal-based interaction', 'Locally running language model', 'Command routing'],
  '/assets/ali/projects/nova/nova-terminal.png',
  '["/assets/ali/projects/nova/nova-terminal.png"]'::jsonb
),
(
  'Solar System Explorer',
  'An educational web application that explores our solar system through interactive 3D visualizations and scientific content. The project combines real-world space exploration topics with browser-based rendering, allowing users to explore planets, compare celestial bodies, browse historical missions, and discover astronomical facts through an immersive interface.',
  'https://solar-system-explorer-rho.vercel.app/',
  NULL,
  ARRAY['JavaScript', 'Three.js', 'WebGL', '3D Rendering'],
  ARRAY['Interactive 3D planets', 'Mission archive', 'Planet comparison tool', 'Discoveries gallery'],
  '/assets/ali/projects/solar/solar-home.png',
  '["/assets/ali/projects/solar/solar-home.png","/assets/ali/projects/solar/solar-about.png","/assets/ali/projects/solar/solar-planets.png","/assets/ali/projects/solar/solar-discoveries.png","/assets/ali/projects/solar/solar-missions.png","/assets/ali/projects/solar/solar-gallery.png","/assets/ali/projects/solar/solar-compare.png"]'::jsonb
),
(
  'Tetrius',
  'A Tetris clone built from scratch in C++ using SFML. The project taught me how game loops, collision detection, matrix rotations, difficulty scaling, and object-oriented programming come together to create an interactive game experience without relying on third-party game engines.',
  NULL,
  NULL,
  ARRAY['C++', 'SFML', 'Game Programming', 'OOP'],
  ARRAY['Custom game loop', 'Collision detection', 'Matrix rotations', 'Difficulty scaling'],
  '/assets/ali/projects/tetrius/tetrius-menu.png',
  '["/assets/ali/projects/tetrius/tetrius-menu.png","/assets/ali/projects/tetrius/tetrius-levels.png","/assets/ali/projects/tetrius/tetrius-gameplay.png"]'::jsonb
),
(
  'Smart Parking Management System',
  'A console-based parking management system built in C++. It allows users to allocate parking spaces, search vehicle records, and manage parking slot availability while using file handling techniques to store and retrieve parking data.',
  NULL,
  NULL,
  ARRAY['C++', 'File Handling', 'Data Structures', 'OOP'],
  ARRAY['Parking allocation', 'Vehicle record search', 'Slot availability tracking'],
  '/assets/ali/projects/parking/parking-allocation.png',
  '["/assets/ali/projects/parking/parking-allocation.png","/assets/ali/projects/parking/parking-search.png","/assets/ali/projects/parking/parking-slots.png"]'::jsonb
);

-- ---- TECH STACK (shown in the admin-managed Tech Stack tab) ----

INSERT INTO public.tech_stack (name) VALUES
('Python'), ('C++'), ('JavaScript'), ('HTML / CSS'),
('Ollama'), ('Whisper'), ('Playwright'), ('Piper TTS'), ('Win32 API'),
('Node.js'), ('Express'), ('MongoDB'), ('SQLite'), ('TCP RCON'),
('Three.js'), ('WebGL'), ('SFML');
