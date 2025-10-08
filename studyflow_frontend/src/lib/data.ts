import { createSupabaseServerClient } from "@/lib/supabase/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

async function getAuthToken() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.access_token;
}

export async function getSubjects() {
  const token = await getAuthToken();
  if (!token) return [];

  try {
    const res = await fetch(`${API_BASE_URL}/subjects`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Falha ao buscar matérias");
    return res.json();
  } catch (error) {
    console.error("Erro em getSubjects:", error);
    return [];
  }
}

export async function getGoals() {
  const token = await getAuthToken();
  if (!token) return [];

  try {
    const res = await fetch(`${API_BASE_URL}/goals`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Falha ao buscar metas");
    return res.json();
  } catch (error) {
    console.error("Erro em getGoals:", error);
    return [];
  }
}

export async function getRecentSessions() {
  const token = await getAuthToken();
  if (!token) return [];

  try {
    const res = await fetch(`${API_BASE_URL}/sessions`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Falha ao buscar sessões");
    return res.json();
  } catch (error) {
    console.error("Erro em getRecentSessions:", error);
    return [];
  }
}

export async function getDashboardStats() {
  const token = await getAuthToken();
  if (!token) return null;

  try {
    const res = await fetch(`${API_BASE_URL}/stats`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Falha ao buscar estatísticas");
    return res.json();
  } catch (error) {
    console.error("Erro em getDashboardStats:", error);
    return {
      weeklyProgress: 0,
      monthlyGoals: { completed: 0, total: 0 },
      totalStudyTime: "0h 0m",
      todayStudyTime: "0h 0m",
    };
  }
}
