// ============================================
// 📁 hooks/auth/useGetUser.js
// ============================================

import { useEffect, useState, useCallback } from "react";
import { getUser } from "../../services/api/auth/api";

export const useGetUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getUser();
      console.log(res);
      
      setUser(res.data);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Function to refetch user data
  const refetchUser = () => {
    fetchProfile();
  };

  return { user, loading, error, refetchUser };
};