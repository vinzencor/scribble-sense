import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vbjctzcyjdlumcuhpwso.supabase.co';
const supabaseAnonKey = 'sb_publishable_rlzvXTpGL7rF98Ajob23JQ_Q6OZ7fES';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables
export interface Service {
  id: string;
  title: string;
  description: string;
  image_url: string;
  display_order: number;
  created_at: string;
}

export interface Resource {
  id: string;
  title: string;
  file_url: string;
  display_order: number;
  created_at: string;
}

export interface Workbook {
  id: string;
  title: string;
  description: string;
  pdf_url: string;
  cover_image_url: string;
  display_order: number;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image_url: string;
  span: string;
  display_order: number;
  created_at: string;
}
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  page: "home" | "about" | "services" | "resources" | "contact" | "all" | string;
  display_order: number;
  created_at: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image_url: string;
  author: string;
  published_date: string;
  display_order: number;
  created_at: string;
}

export interface SEOSetting {
  id: string;
  page: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_image_url: string;
  created_at: string;
  updated_at: string;
}

// Helper functions for authentication
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Services CRUD
export const getServices = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .order('display_order', { ascending: true });
  return { data, error };
};

export const createService = async (service: Omit<Service, 'id' | 'created_at'>) => {
  const { data, error } = await supabase.from('services').insert([service]).select();
  return { data, error };
};

export const updateService = async (id: string, service: Partial<Service>) => {
  const { data, error } = await supabase.from('services').update(service).eq('id', id).select();
  return { data, error };
};

export const deleteService = async (id: string) => {
  const { error } = await supabase.from('services').delete().eq('id', id);
  return { error };
};

// Resources CRUD
export const getResources = async () => {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .order('display_order', { ascending: true });
  return { data, error };
};

export const createResource = async (resource: Omit<Resource, 'id' | 'created_at'>) => {
  const { data, error } = await supabase.from('resources').insert([resource]).select();
  return { data, error };
};

export const updateResource = async (id: string, resource: Partial<Resource>) => {
  const { data, error } = await supabase.from('resources').update(resource).eq('id', id).select();
  return { data, error };
};

export const deleteResource = async (id: string) => {
  const { error } = await supabase.from('resources').delete().eq('id', id);
  return { error };
};

// Workbooks CRUD
export const getWorkbooks = async () => {
  const { data, error } = await supabase
    .from('workbooks')
    .select('*')
    .order('display_order', { ascending: true });
  return { data, error };
};

export const createWorkbook = async (workbook: Omit<Workbook, 'id' | 'created_at'>) => {
  const { data, error } = await supabase.from('workbooks').insert([workbook]).select();
  return { data, error };
};

export const updateWorkbook = async (id: string, workbook: Partial<Workbook>) => {
  const { data, error } = await supabase.from('workbooks').update(workbook).eq('id', id).select();
  return { data, error };
};

export const deleteWorkbook = async (id: string) => {
  const { error } = await supabase.from('workbooks').delete().eq('id', id);
  return { error };
};

// Gallery Images CRUD
export const getGalleryImages = async () => {
  const { data, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('display_order', { ascending: true });
  return { data, error };
};

export const createGalleryImage = async (image: Omit<GalleryImage, 'id' | 'created_at'>) => {
  const { data, error } = await supabase.from('gallery_images').insert([image]).select();
  return { data, error };
};

export const updateGalleryImage = async (id: string, image: Partial<GalleryImage>) => {
  const { data, error } = await supabase.from('gallery_images').update(image).eq('id', id).select();
  return { data, error };
};

export const deleteGalleryImage = async (id: string) => {
  console.log('Attempting to delete gallery image with id:', id);
  const { data, error } = await supabase
    .from('gallery_images')
    .delete()
    .eq('id', id)
    .select();
  
  console.log('Delete result:', { data, error });
  
  if (error) {
    console.error('Delete error details:', error);
  }
  
  return { data, error };
};

// File upload helper
export const uploadFile = async (bucket: string, path: string, file: File) => {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: true
  });
  if (error) return { data: null, error };

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(path);
  return { data: { path: data.path, publicUrl: urlData.publicUrl }, error: null };
};

export const deleteFile = async (bucket: string, path: string) => {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  return { error };
};

export const getFAQs = async (page?: string) => {
  let query = supabase.from('faqs').select('*');
  if (page) {
    query = query.in('page', [page, 'all']);
  }
  const { data, error } = await query.order('display_order', { ascending: true });
  return { data, error };
};

export const createFAQ = async (faq: Omit<FAQ, 'id' | 'created_at'>) => {
  const { data, error } = await supabase.from('faqs').insert([faq]).select();
  return { data, error };
};

export const updateFAQ = async (id: string, faq: Partial<FAQ>) => {
  const { data, error } = await supabase.from('faqs').update(faq).eq('id', id).select();
  return { data, error };
};

export const deleteFAQ = async (id: string) => {
  const { error } = await supabase.from('faqs').delete().eq('id', id);
  return { error };
};

// Blogs CRUD
export const getBlogs = async () => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('display_order', { ascending: true })
    .order('published_date', { ascending: false });
  return { data, error };
};

export const getBlogBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  return { data, error };
};

export const createBlog = async (blog: Omit<Blog, 'id' | 'created_at'>) => {
  const { data, error } = await supabase.from('blogs').insert([blog]).select();
  return { data, error };
};

export const updateBlog = async (id: string, blog: Partial<Blog>) => {
  const { data, error } = await supabase.from('blogs').update(blog).eq('id', id).select();
  return { data, error };
};

export const deleteBlog = async (id: string) => {
  const { error } = await supabase.from('blogs').delete().eq('id', id);
  return { error };
};

// SEO settings
export const getSEOSettings = async (page?: string) => {
  let query = supabase.from('seo_settings').select('*');
  if (page) {
    query = query.eq('page', page).maybeSingle();
  }
  const { data, error } = await query;
  return { data, error };
};

export const updateSEOSettings = async (page: string, settings: Partial<SEOSetting>) => {
  const { data: existing } = await supabase
    .from('seo_settings')
    .select('id')
    .eq('page', page)
    .maybeSingle();

  if (existing?.id) {
    const { data, error } = await supabase
      .from('seo_settings')
      .update({ ...settings, page })
      .eq('id', existing.id)
      .select();
    return { data, error };
  }

  const { data, error } = await supabase
    .from('seo_settings')
    .insert([{ ...settings, page }])
    .select();
  return { data, error };
};

export const deleteSEOSettings = async (id: string) => {
  const { error } = await supabase.from('seo_settings').delete().eq('id', id);
  return { error };
};
