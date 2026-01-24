// Hook để lấy số lượng đơn yêu cầu chờ duyệt
import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface PendingRequestsResponse {
  count: number;
}

export function usePendingRequests() {
  const { nguoiDung, coQuyen, coVaiTro } = useAuth();
  
  // Chỉ fetch nếu user có quyền duyệt
  const canApprove = 
    coVaiTro('ADMIN') || 
    coQuyen('YEU_CAU_DUYET_CAP_1') || 
    coQuyen('YEU_CAU_DUYET_CAP_2');

  const { data, isLoading } = useQuery({
    queryKey: ['pending-requests-count'],
    queryFn: async () => {
      const res = await api.get<PendingRequestsResponse>('/yeu-cau/don/pending-count');
      return res.data;
    },
    enabled: !!nguoiDung && canApprove,
    refetchInterval: 30000, // Refetch mỗi 30 giây
    staleTime: 10000, // Cache 10 giây
  });

  return {
    pendingCount: data?.count || 0,
    isLoading,
    canApprove,
  };
}
