export interface Project {
  id: string
  title: string
  description: string
  live_url: string | null
  github_url: string | null
  technologies: string[]
  key_features: string[]
  image_url: string | null
  image_urls: string[]
  created_at: string
  updated_at: string
}

export interface Certificate {
  id: number
  title: string
  image_url: string | null
  created_at: string
}

export interface TechStackItem {
  id: number
  name: string
  logo_url: string | null
  created_at: string
}

export interface CommentReply {
  username: string
  message: string
  created_at: string
}

export interface Comment {
  id: number
  name: string
  comment: string
  image_url: string | null
  likes: number
  is_pinned: boolean
  replies: CommentReply[]
  created_at: string
  liked_by_admin: boolean
}
