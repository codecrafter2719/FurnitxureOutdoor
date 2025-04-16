import { supabase } from './supabase';

export interface Feedback {
  id: string;
  created_at: string;
  name: string;
  email: string;
  role: string;
  location: string;
  rating: number;
  purchased_items: string[];
  product_name: string;
  feedback_text: string;
}

export async function getFeedback() {
  try {
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return [];
  }
}

export async function getTopFeedback(limit: number = 3) {
  try {
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('rating', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching top feedback:', error);
    return [];
  }
}

export async function submitFeedback(feedback: Omit<Feedback, 'id' | 'created_at'>) {
  try {
    const { data, error } = await supabase
      .from('feedback')
      .insert([feedback])
      .select();

    if (error) throw error;
    return data?.[0];
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
} 