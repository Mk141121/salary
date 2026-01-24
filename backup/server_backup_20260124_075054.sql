--
-- PostgreSQL database dump
--

\restrict fIpRLhK1UEoZyhadtzYK28XjSHBtQVoiJIAfy0ijdCzUAAL7zi8jnefdkSUxXP3

-- Dumped from database version 15.15 (Debian 15.15-1.pgdg12+1)
-- Dumped by pg_dump version 15.15 (Debian 15.15-1.pgdg12+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.vai_tro_quyen DROP CONSTRAINT IF EXISTS vai_tro_quyen_vai_tro_id_fkey;
ALTER TABLE IF EXISTS ONLY public.vai_tro_quyen DROP CONSTRAINT IF EXISTS vai_tro_quyen_quyen_id_fkey;
ALTER TABLE IF EXISTS ONLY public.thong_bao DROP CONSTRAINT IF EXISTS thong_bao_nguoi_nhan_id_fkey;
ALTER TABLE IF EXISTS ONLY public.su_kien_thuong_phat DROP CONSTRAINT IF EXISTS su_kien_thuong_phat_phong_ban_id_fkey;
ALTER TABLE IF EXISTS ONLY public.su_kien_thuong_phat DROP CONSTRAINT IF EXISTS su_kien_thuong_phat_nhan_vien_id_fkey;
ALTER TABLE IF EXISTS ONLY public.snapshot_san_luong_chia_hang DROP CONSTRAINT IF EXISTS snapshot_san_luong_chia_hang_bang_luong_id_fkey;
ALTER TABLE IF EXISTS ONLY public.snapshot_giao_hang DROP CONSTRAINT IF EXISTS snapshot_giao_hang_bang_luong_id_fkey;
ALTER TABLE IF EXISTS ONLY public.snapshot_chi_tiet_bang_ung_luong DROP CONSTRAINT IF EXISTS snapshot_chi_tiet_bang_ung_luong_snapshot_id_fkey;
ALTER TABLE IF EXISTS ONLY public.snapshot_bang_ung_luong DROP CONSTRAINT IF EXISTS snapshot_bang_ung_luong_bang_ung_luong_id_fkey;
ALTER TABLE IF EXISTS ONLY public.san_luong_chia_hang DROP CONSTRAINT IF EXISTS san_luong_chia_hang_nhan_vien_id_fkey;
ALTER TABLE IF EXISTS ONLY public.san_luong_chia_hang DROP CONSTRAINT IF EXISTS san_luong_chia_hang_import_id_fkey;
ALTER TABLE IF EXISTS ONLY public.rule_trace DROP CONSTRAINT IF EXISTS rule_trace_quy_che_rule_id_fkey;
ALTER TABLE IF EXISTS ONLY public.rule_trace DROP CONSTRAINT IF EXISTS rule_trace_quy_che_id_fkey;
ALTER TABLE IF EXISTS ONLY public.rule_trace DROP CONSTRAINT IF EXISTS rule_trace_nhan_vien_id_fkey;
ALTER TABLE IF EXISTS ONLY public.rule_trace DROP CONSTRAINT IF EXISTS rule_trace_khoan_luong_id_fkey;
ALTER TABLE IF EXISTS ONLY public.rule_trace DROP CONSTRAINT IF EXISTS rule_trace_bang_luong_id_fkey;
ALTER TABLE IF EXISTS ONLY public.request_workflow_config DROP CONSTRAINT IF EXISTS request_workflow_config_loai_yeu_cau_id_fkey;
ALTER TABLE IF EXISTS ONLY public.request_mapping_cham_cong DROP CONSTRAINT IF EXISTS request_mapping_cham_cong_don_yeu_cau_id_fkey;
ALTER TABLE IF EXISTS ONLY public.quy_che_rule DROP CONSTRAINT IF EXISTS quy_che_rule_quy_che_id_fkey;
ALTER TABLE IF EXISTS ONLY public.quy_che_rule DROP CONSTRAINT IF EXISTS quy_che_rule_khoan_luong_id_fkey;
ALTER TABLE IF EXISTS ONLY public.quy_che DROP CONSTRAINT IF EXISTS quy_che_phong_ban_id_fkey;
ALTER TABLE IF EXISTS ONLY public.phu_cap_nhan_vien DROP CONSTRAINT IF EXISTS phu_cap_nhan_vien_nhan_vien_id_fkey;
ALTER TABLE IF EXISTS ONLY public.phu_cap_nhan_vien DROP CONSTRAINT IF EXISTS phu_cap_nhan_vien_khoan_luong_id_fkey;
ALTER TABLE IF EXISTS ONLY public.phong_ban DROP CONSTRAINT IF EXISTS phong_ban_phong_ban_cha_id_fkey;
ALTER TABLE IF EXISTS ONLY public.phieu_dieu_chinh DROP CONSTRAINT IF EXISTS phieu_dieu_chinh_nhan_vien_id_fkey;
ALTER TABLE IF EXISTS ONLY public.phien_dang_nhap DROP CONSTRAINT IF EXISTS phien_dang_nhap_nguoi_dung_id_fkey;
ALTER TABLE IF EXISTS ONLY public.phan_quyen_phong_ban DROP CONSTRAINT IF EXISTS phan_quyen_phong_ban_phong_ban_id_fkey;
ALTER TABLE IF EXISTS ONLY public.nhan_vien_trach_nhiem DROP CONSTRAINT IF EXISTS nhan_vien_trach_nhiem_phong_ban_id_fkey;
ALTER TABLE IF EXISTS ONLY public.nhan_vien_trach_nhiem DROP CONSTRAINT IF EXISTS nhan_vien_trach_nhiem_nhan_vien_id_fkey;
ALTER TABLE IF EXISTS ONLY public.nhan_vien_thuoc_nhom DROP CONSTRAINT IF EXISTS nhan_vien_thuoc_nhom_nhom_id_fkey;
ALTER TABLE IF EXISTS ONLY public.nhan_vien_thuoc_nhom DROP CONSTRAINT IF EXISTS nhan_vien_thuoc_nhom_nhan_vien_id_fkey;
ALTER TABLE IF EXISTS ONLY public.nhan_vien_thue_bh DROP CONSTRAINT IF EXISTS nhan_vien_thue_bh_nhan_vien_id_fkey;
ALTER TABLE IF EXISTS ONLY public.nhan_vien_phong_ban DROP CONSTRAINT IF EXISTS nhan_vien_phong_ban_phong_ban_id_fkey;
ALTER TABLE IF EXISTS ONLY public.nhan_vien_phong_ban DROP CONSTRAINT IF EXISTS nhan_vien_phong_ban_nhan_vien_id_fkey;
ALTER TABLE IF EXISTS ONLY public.nhan_vien DROP CONSTRAINT IF EXISTS nhan_vien_phong_ban_id_fkey;
ALTER TABLE IF EXISTS ONLY public.nhan_vien_phong_ban DROP CONSTRAINT IF EXISTS nhan_vien_phong_ban_don_vi_con_id_fkey;
ALTER TABLE IF EXISTS ONLY public.nhan_vien_ngan_hang DROP CONSTRAINT IF EXISTS nhan_vien_ngan_hang_nhan_vien_id_fkey;
ALTER TABLE IF EXISTS ONLY public.nhan_vien_hop_dong DROP CONSTRAINT IF EXISTS nhan_vien_hop_dong_nhan_vien_id_fkey;
ALTER TABLE IF EXISTS ONLY public.nguoi_phu_thuoc DROP CONSTRAINT IF EXISTS nguoi_phu_thuoc_nhan_vien_id_fkey;
ALTER TABLE IF EXISTS ONLY public.nguoi_dung_vai_tro DROP CONSTRAINT IF EXISTS nguoi_dung_vai_tro_vai_tro_id_fkey;
ALTER TABLE IF EXISTS ONLY public.nguoi_dung_vai_tro DROP CONSTRAINT IF EXISTS nguoi_dung_vai_tro_nguoi_dung_id_fkey;
ALTER TABLE IF EXISTS ONLY public.ngay_cong_bang_luong DROP CONSTRAINT IF EXISTS ngay_cong_bang_luong_nhan_vien_id_fkey;
ALTER TABLE IF EXISTS ONLY public.ngay_cong_bang_luong DROP CONSTRAINT IF EXISTS ngay_cong_bang_luong_bang_luong_id_fkey;
ALTER TABLE IF EXISTS ONLY public.lich_su_import DROP CONSTRAINT IF EXISTS lich_su_import_nguoi_import_id_fkey;
ALTER TABLE IF EXISTS ONLY public.lich_su_chinh_sua DROP CONSTRAINT IF EXISTS lich_su_chinh_sua_nhan_vien_id_fkey;
ALTER TABLE IF EXISTS ONLY public.lich_su_chinh_sua DROP CONSTRAINT IF EXISTS lich_su_chinh_sua_khoan_luong_id_fkey;
ALTER TABLE IF EXISTS ONLY public.lich_phan_ca_chi_tiet DROP CONSTRAINT IF EXISTS lich_phan_ca_chi_tiet_lich_phan_ca_id_fkey;
ALTER TABLE IF EXISTS ONLY public.lich_phan_ca_chi_tiet DROP CONSTRAINT IF EXISTS lich_phan_ca_chi_tiet_ca_lam_viec_id_fkey;
ALTER TABLE IF EXISTS ONLY public.ket_qua_kpi DROP CONSTRAINT IF EXISTS ket_qua_kpi_danh_gia_id_fkey;
ALTER TABLE IF EXISTS ONLY public.ket_qua_kpi DROP CONSTRAINT IF EXISTS ket_qua_kpi_chi_tieu_id_fkey;
ALTER TABLE IF EXISTS ONLY public.giao_hang DROP CONSTRAINT IF EXISTS giao_hang_nhan_vien_id_fkey;
ALTER TABLE IF EXISTS ONLY public.giao_hang DROP CONSTRAINT IF EXISTS giao_hang_import_id_fkey;
ALTER TABLE IF EXISTS ONLY public.don_yeu_cau DROP CONSTRAINT IF EXISTS don_yeu_cau_phong_ban_id_fkey;
ALTER TABLE IF EXISTS ONLY public.don_yeu_cau DROP CONSTRAINT IF EXISTS don_yeu_cau_nhan_vien_id_fkey;
ALTER TABLE IF EXISTS ONLY public.don_yeu_cau DROP CONSTRAINT IF EXISTS don_yeu_cau_nguoi_override_id_fkey;
ALTER TABLE IF EXISTS ONLY public.don_yeu_cau DROP CONSTRAINT IF EXISTS don_yeu_cau_nguoi_duyet_2_id_fkey;
ALTER TABLE IF EXISTS ONLY public.don_yeu_cau DROP CONSTRAINT IF EXISTS don_yeu_cau_nguoi_duyet_1_id_fkey;
ALTER TABLE IF EXISTS ONLY public.don_yeu_cau DROP CONSTRAINT IF EXISTS don_yeu_cau_loai_yeu_cau_id_fkey;
ALTER TABLE IF EXISTS ONLY public.don_vi_con DROP CONSTRAINT IF EXISTS don_vi_con_phong_ban_id_fkey;
ALTER TABLE IF EXISTS ONLY public.don_nghi_phep DROP CONSTRAINT IF EXISTS don_nghi_phep_phong_ban_id_fkey;
ALTER TABLE IF EXISTS ONLY public.don_nghi_phep DROP CONSTRAINT IF EXISTS don_nghi_phep_nhan_vien_id_fkey;
ALTER TABLE IF EXISTS ONLY public.don_nghi_phep DROP CONSTRAINT IF EXISTS don_nghi_phep_nguoi_duyet_id_fkey;
ALTER TABLE IF EXISTS ONLY public.don_nghi_phep DROP CONSTRAINT IF EXISTS don_nghi_phep_loai_nghi_id_fkey;
ALTER TABLE IF EXISTS ONLY public.danh_gia_kpi_nhan_vien DROP CONSTRAINT IF EXISTS danh_gia_kpi_nhan_vien_ky_danh_gia_id_fkey;
ALTER TABLE IF EXISTS ONLY public.co_cau_luong DROP CONSTRAINT IF EXISTS co_cau_luong_phong_ban_id_fkey;
ALTER TABLE IF EXISTS ONLY public.co_cau_luong_chi_tiet DROP CONSTRAINT IF EXISTS co_cau_luong_chi_tiet_khoan_luong_id_fkey;
ALTER TABLE IF EXISTS ONLY public.co_cau_luong_chi_tiet DROP CONSTRAINT IF EXISTS co_cau_luong_chi_tiet_co_cau_luong_id_fkey;
ALTER TABLE IF EXISTS ONLY public.chi_tieu_kpi DROP CONSTRAINT IF EXISTS chi_tieu_kpi_template_id_fkey;
ALTER TABLE IF EXISTS ONLY public.chi_tiet_phieu_dieu_chinh DROP CONSTRAINT IF EXISTS chi_tiet_phieu_dieu_chinh_phieu_dieu_chinh_id_fkey;
ALTER TABLE IF EXISTS ONLY public.chi_tiet_phieu_dieu_chinh DROP CONSTRAINT IF EXISTS chi_tiet_phieu_dieu_chinh_khoan_luong_id_fkey;
ALTER TABLE IF EXISTS ONLY public.chi_tiet_nghi_phep_ngay DROP CONSTRAINT IF EXISTS chi_tiet_nghi_phep_ngay_nhan_vien_id_fkey;
ALTER TABLE IF EXISTS ONLY public.chi_tiet_nghi_phep_ngay DROP CONSTRAINT IF EXISTS chi_tiet_nghi_phep_ngay_loai_nghi_id_fkey;
ALTER TABLE IF EXISTS ONLY public.chi_tiet_nghi_phep_ngay DROP CONSTRAINT IF EXISTS chi_tiet_nghi_phep_ngay_don_nghi_phep_id_fkey;
ALTER TABLE IF EXISTS ONLY public.chi_tiet_cham_cong DROP CONSTRAINT IF EXISTS chi_tiet_cham_cong_ca_lam_viec_id_fkey;
ALTER TABLE IF EXISTS ONLY public.chi_tiet_bang_ung_luong DROP CONSTRAINT IF EXISTS chi_tiet_bang_ung_luong_bang_ung_luong_id_fkey;
ALTER TABLE IF EXISTS ONLY public.chi_tiet_bang_luong DROP CONSTRAINT IF EXISTS chi_tiet_bang_luong_nhan_vien_id_fkey;
ALTER TABLE IF EXISTS ONLY public.chi_tiet_bang_luong DROP CONSTRAINT IF EXISTS chi_tiet_bang_luong_khoan_luong_id_fkey;
ALTER TABLE IF EXISTS ONLY public.chi_tiet_bang_luong DROP CONSTRAINT IF EXISTS chi_tiet_bang_luong_bang_luong_id_fkey;
ALTER TABLE IF EXISTS ONLY public.cham_cong DROP CONSTRAINT IF EXISTS cham_cong_nhan_vien_id_fkey;
ALTER TABLE IF EXISTS ONLY public.cau_hinh_import_phong_ban DROP CONSTRAINT IF EXISTS cau_hinh_import_phong_ban_phong_ban_id_fkey;
ALTER TABLE IF EXISTS ONLY public.cau_hinh_don_gia DROP CONSTRAINT IF EXISTS cau_hinh_don_gia_phong_ban_id_fkey;
ALTER TABLE IF EXISTS ONLY public.bien_so_cong_thuc DROP CONSTRAINT IF EXISTS bien_so_cong_thuc_cong_thuc_id_fkey;
ALTER TABLE IF EXISTS ONLY public.bang_luong_quy_che DROP CONSTRAINT IF EXISTS bang_luong_quy_che_quy_che_id_fkey;
ALTER TABLE IF EXISTS ONLY public.bang_luong_quy_che DROP CONSTRAINT IF EXISTS bang_luong_quy_che_bang_luong_id_fkey;
ALTER TABLE IF EXISTS ONLY public.bang_luong DROP CONSTRAINT IF EXISTS bang_luong_phong_ban_id_fkey;
ALTER TABLE IF EXISTS ONLY public.bang_ghi_cham_cong_gps DROP CONSTRAINT IF EXISTS bang_ghi_cham_cong_gps_geofence_id_fkey;
ALTER TABLE IF EXISTS ONLY public.bac_thue_tncn DROP CONSTRAINT IF EXISTS bac_thue_tncn_cau_hinh_thue_id_fkey;
ALTER TABLE IF EXISTS ONLY public.audit_sua_du_lieu DROP CONSTRAINT IF EXISTS audit_sua_du_lieu_sua_boi_fkey;
ALTER TABLE IF EXISTS ONLY public.audit_log DROP CONSTRAINT IF EXISTS audit_log_nguoi_dung_id_fkey;
ALTER TABLE IF EXISTS ONLY public.ai_rule_audit DROP CONSTRAINT IF EXISTS ai_rule_audit_rule_ap_dung_id_fkey;
ALTER TABLE IF EXISTS ONLY public.ai_rule_audit DROP CONSTRAINT IF EXISTS ai_rule_audit_quy_che_id_fkey;
ALTER TABLE IF EXISTS ONLY public.ai_rule_audit DROP CONSTRAINT IF EXISTS ai_rule_audit_phong_ban_id_fkey;
ALTER TABLE IF EXISTS ONLY public.ai_rule_audit DROP CONSTRAINT IF EXISTS ai_rule_audit_nguoi_tao_id_fkey;
DROP INDEX IF EXISTS public.yeu_cau_sua_cong_trang_thai_duyet_idx;
DROP INDEX IF EXISTS public.yeu_cau_sua_cong_nhan_vien_id_idx;
DROP INDEX IF EXISTS public.yeu_cau_sua_cong_nguoi_tao_id_idx;
DROP INDEX IF EXISTS public.yeu_cau_sua_cong_ngay_cham_cong_idx;
DROP INDEX IF EXISTS public.vai_tro_quyen_vai_tro_id_quyen_id_key;
DROP INDEX IF EXISTS public.vai_tro_ma_vai_tro_key;
DROP INDEX IF EXISTS public.thong_bao_nguoi_nhan_id_ngay_tao_idx;
DROP INDEX IF EXISTS public.thong_bao_nguoi_nhan_id_da_doc_idx;
DROP INDEX IF EXISTS public.thong_bao_loai_thong_bao_idx;
DROP INDEX IF EXISTS public.thiet_bi_nhan_vien_trang_thai_idx;
DROP INDEX IF EXISTS public.thiet_bi_nhan_vien_nhan_vien_id_key;
DROP INDEX IF EXISTS public.thiet_bi_nhan_vien_device_id_idx;
DROP INDEX IF EXISTS public.template_kpi_ma_template_key;
DROP INDEX IF EXISTS public.su_kien_thuong_phat_trang_thai_idx;
DROP INDEX IF EXISTS public.su_kien_thuong_phat_phong_ban_id_idx;
DROP INDEX IF EXISTS public.su_kien_thuong_phat_nhan_vien_id_idx;
DROP INDEX IF EXISTS public.su_kien_thuong_phat_ngay_idx;
DROP INDEX IF EXISTS public.su_kien_thuong_phat_loai_su_kien_idx;
DROP INDEX IF EXISTS public.snapshot_san_luong_chia_hang_nhan_vien_id_idx;
DROP INDEX IF EXISTS public.snapshot_san_luong_chia_hang_bang_luong_id_nhan_vien_id_key;
DROP INDEX IF EXISTS public.snapshot_san_luong_chia_hang_bang_luong_id_idx;
DROP INDEX IF EXISTS public.snapshot_giao_hang_nhan_vien_id_idx;
DROP INDEX IF EXISTS public.snapshot_giao_hang_bang_luong_id_nhan_vien_id_key;
DROP INDEX IF EXISTS public.snapshot_giao_hang_bang_luong_id_idx;
DROP INDEX IF EXISTS public.snapshot_chi_tiet_bang_ung_luong_snapshot_id_idx;
DROP INDEX IF EXISTS public.snapshot_chi_tiet_bang_ung_luong_nhan_vien_id_idx;
DROP INDEX IF EXISTS public.snapshot_bang_ung_luong_bang_ung_luong_id_idx;
DROP INDEX IF EXISTS public.snapshot_bang_luong_phong_ban_id_idx;
DROP INDEX IF EXISTS public.snapshot_bang_luong_nhan_vien_id_idx;
DROP INDEX IF EXISTS public.snapshot_bang_luong_bang_luong_id_nhan_vien_id_idx;
DROP INDEX IF EXISTS public.snapshot_bang_luong_bang_luong_id_idx;
DROP INDEX IF EXISTS public.san_luong_chia_hang_nhan_vien_id_idx;
DROP INDEX IF EXISTS public.san_luong_chia_hang_ngay_nhan_vien_id_key;
DROP INDEX IF EXISTS public.san_luong_chia_hang_ngay_idx;
DROP INDEX IF EXISTS public.san_luong_chia_hang_import_id_idx;
DROP INDEX IF EXISTS public.rule_trace_tao_luc_idx;
DROP INDEX IF EXISTS public.rule_trace_quy_che_id_idx;
DROP INDEX IF EXISTS public.rule_trace_nhan_vien_id_idx;
DROP INDEX IF EXISTS public.rule_trace_bang_luong_id_nhan_vien_id_idx;
DROP INDEX IF EXISTS public.rule_trace_bang_luong_id_idx;
DROP INDEX IF EXISTS public.request_workflow_config_phong_ban_id_idx;
DROP INDEX IF EXISTS public.request_workflow_config_loai_yeu_cau_id_phong_ban_id_key;
DROP INDEX IF EXISTS public.request_workflow_config_loai_yeu_cau_id_idx;
DROP INDEX IF EXISTS public.request_mapping_cham_cong_nhan_vien_id_ngay_idx;
DROP INDEX IF EXISTS public.request_mapping_cham_cong_don_yeu_cau_id_ngay_key;
DROP INDEX IF EXISTS public.request_mapping_cham_cong_don_yeu_cau_id_idx;
DROP INDEX IF EXISTS public.request_mapping_cham_cong_da_ap_dung_idx;
DROP INDEX IF EXISTS public.quyen_ma_quyen_key;
DROP INDEX IF EXISTS public.quy_che_tu_ngay_den_ngay_idx;
DROP INDEX IF EXISTS public.quy_che_trang_thai_idx;
DROP INDEX IF EXISTS public.quy_che_rule_thu_tu_uu_tien_idx;
DROP INDEX IF EXISTS public.quy_che_rule_quy_che_id_idx;
DROP INDEX IF EXISTS public.quy_che_rule_khoan_luong_id_idx;
DROP INDEX IF EXISTS public.quy_che_phong_ban_id_idx;
DROP INDEX IF EXISTS public.phong_ban_phong_ban_cha_id_cap_do_idx;
DROP INDEX IF EXISTS public.phong_ban_ma_phong_ban_key;
DROP INDEX IF EXISTS public.phieu_dieu_chinh_ma_phieu_key;
DROP INDEX IF EXISTS public.phien_dang_nhap_token_key;
DROP INDEX IF EXISTS public.phien_dang_nhap_thoi_gian_het_han_idx;
DROP INDEX IF EXISTS public.phien_dang_nhap_nguoi_dung_id_idx;
DROP INDEX IF EXISTS public.phan_quyen_phong_ban_nguoi_dung_id_phong_ban_id_quyen_key;
DROP INDEX IF EXISTS public.nhom_nhan_vien_ma_nhom_key;
DROP INDEX IF EXISTS public.nhan_vien_trach_nhiem_tu_ngay_den_ngay_idx;
DROP INDEX IF EXISTS public.nhan_vien_trach_nhiem_phong_ban_id_idx;
DROP INDEX IF EXISTS public.nhan_vien_trach_nhiem_nhan_vien_id_idx;
DROP INDEX IF EXISTS public.nhan_vien_thuoc_nhom_nhom_id_idx;
DROP INDEX IF EXISTS public.nhan_vien_thuoc_nhom_nhan_vien_id_nhom_id_tu_ngay_key;
DROP INDEX IF EXISTS public.nhan_vien_thuoc_nhom_nhan_vien_id_idx;
DROP INDEX IF EXISTS public.nhan_vien_thue_bh_nhan_vien_id_key;
DROP INDEX IF EXISTS public.nhan_vien_phong_ban_phong_ban_id_don_vi_con_id_idx;
DROP INDEX IF EXISTS public.nhan_vien_phong_ban_nhan_vien_id_tu_ngay_den_ngay_idx;
DROP INDEX IF EXISTS public.nhan_vien_ngan_hang_nhan_vien_id_la_mac_dinh_idx;
DROP INDEX IF EXISTS public.nhan_vien_ngan_hang_nhan_vien_id_idx;
DROP INDEX IF EXISTS public.nhan_vien_ma_nhan_vien_key;
DROP INDEX IF EXISTS public.nhan_vien_hop_dong_trang_thai_idx;
DROP INDEX IF EXISTS public.nhan_vien_hop_dong_nhan_vien_id_tu_ngay_den_ngay_idx;
DROP INDEX IF EXISTS public.nhan_vien_hop_dong_nhan_vien_id_idx;
DROP INDEX IF EXISTS public.nhan_vien_email_key;
DROP INDEX IF EXISTS public.nguoi_dung_vai_tro_nguoi_dung_id_vai_tro_id_phong_ban_id_key;
DROP INDEX IF EXISTS public.nguoi_dung_ten_dang_nhap_key;
DROP INDEX IF EXISTS public.nguoi_dung_nhan_vien_id_key;
DROP INDEX IF EXISTS public.nguoi_dung_email_key;
DROP INDEX IF EXISTS public.ngay_cong_bang_luong_nhan_vien_id_idx;
DROP INDEX IF EXISTS public.ngay_cong_bang_luong_bang_luong_id_nhan_vien_id_key;
DROP INDEX IF EXISTS public.ngay_cong_bang_luong_bang_luong_id_idx;
DROP INDEX IF EXISTS public.lich_su_thiet_bi_nhan_vien_id_idx;
DROP INDEX IF EXISTS public.lich_su_thiet_bi_ngay_tao_idx;
DROP INDEX IF EXISTS public.lich_su_thiet_bi_hanh_dong_idx;
DROP INDEX IF EXISTS public.lich_su_sua_cong_nhan_vien_id_ngay_cham_cong_idx;
DROP INDEX IF EXISTS public.lich_su_sua_cong_nguon_thay_doi_idx;
DROP INDEX IF EXISTS public.lich_su_sua_cong_ngay_tao_idx;
DROP INDEX IF EXISTS public.lich_su_import_nguoi_import_id_idx;
DROP INDEX IF EXISTS public.lich_su_import_ngay_du_lieu_idx;
DROP INDEX IF EXISTS public.lich_su_import_loai_import_idx;
DROP INDEX IF EXISTS public.lich_su_import_import_luc_idx;
DROP INDEX IF EXISTS public.lich_phan_ca_trang_thai_idx;
DROP INDEX IF EXISTS public.lich_phan_ca_thang_nam_phong_ban_id_nhom_id_key;
DROP INDEX IF EXISTS public.lich_phan_ca_thang_nam_idx;
DROP INDEX IF EXISTS public.lich_phan_ca_phong_ban_id_idx;
DROP INDEX IF EXISTS public.lich_phan_ca_nhom_id_idx;
DROP INDEX IF EXISTS public.lich_phan_ca_chi_tiet_nhan_vien_id_ngay_key;
DROP INDEX IF EXISTS public.lich_phan_ca_chi_tiet_nhan_vien_id_idx;
DROP INDEX IF EXISTS public.lich_phan_ca_chi_tiet_ngay_idx;
DROP INDEX IF EXISTS public.lich_phan_ca_chi_tiet_lich_phan_ca_id_idx;
DROP INDEX IF EXISTS public.lich_phan_ca_chi_tiet_ca_lam_viec_id_idx;
DROP INDEX IF EXISTS public.ky_danh_gia_kpi_ma_ky_key;
DROP INDEX IF EXISTS public.khoan_luong_ma_khoan_key;
DROP INDEX IF EXISTS public.ket_qua_kpi_danh_gia_id_chi_tieu_id_key;
DROP INDEX IF EXISTS public.giao_hang_nhan_vien_id_idx;
DROP INDEX IF EXISTS public.giao_hang_ngay_nhan_vien_id_key;
DROP INDEX IF EXISTS public.giao_hang_ngay_idx;
DROP INDEX IF EXISTS public.giao_hang_import_id_idx;
DROP INDEX IF EXISTS public.don_yeu_cau_trang_thai_idx;
DROP INDEX IF EXISTS public.don_yeu_cau_phong_ban_id_idx;
DROP INDEX IF EXISTS public.don_yeu_cau_nhan_vien_id_ngay_yeu_cau_loai_yeu_cau_id_gio_b_key;
DROP INDEX IF EXISTS public.don_yeu_cau_nhan_vien_id_idx;
DROP INDEX IF EXISTS public.don_yeu_cau_nguoi_duyet_2_id_idx;
DROP INDEX IF EXISTS public.don_yeu_cau_nguoi_duyet_1_id_idx;
DROP INDEX IF EXISTS public.don_yeu_cau_ngay_yeu_cau_idx;
DROP INDEX IF EXISTS public.don_yeu_cau_ma_don_key;
DROP INDEX IF EXISTS public.don_yeu_cau_loai_yeu_cau_id_idx;
DROP INDEX IF EXISTS public.don_vi_con_phong_ban_id_ma_don_vi_key;
DROP INDEX IF EXISTS public.don_nghi_phep_tu_ngay_den_ngay_idx;
DROP INDEX IF EXISTS public.don_nghi_phep_trang_thai_idx;
DROP INDEX IF EXISTS public.don_nghi_phep_phong_ban_id_idx;
DROP INDEX IF EXISTS public.don_nghi_phep_nhan_vien_id_tu_ngay_den_ngay_loai_nghi_id_key;
DROP INDEX IF EXISTS public.don_nghi_phep_nhan_vien_id_idx;
DROP INDEX IF EXISTS public.don_nghi_phep_ma_don_key;
DROP INDEX IF EXISTS public.don_nghi_phep_loai_nghi_id_idx;
DROP INDEX IF EXISTS public.danh_muc_su_kien_ma_su_kien_key;
DROP INDEX IF EXISTS public.danh_muc_loai_yeu_cau_nhom_loai_idx;
DROP INDEX IF EXISTS public.danh_muc_loai_yeu_cau_ma_loai_key;
DROP INDEX IF EXISTS public.danh_muc_loai_yeu_cau_is_active_idx;
DROP INDEX IF EXISTS public.danh_muc_loai_nghi_nhom_loai_idx;
DROP INDEX IF EXISTS public.danh_muc_loai_nghi_ma_loai_nghi_key;
DROP INDEX IF EXISTS public.danh_muc_loai_nghi_is_active_idx;
DROP INDEX IF EXISTS public.danh_gia_kpi_nhan_vien_ky_danh_gia_id_nhan_vien_id_key;
DROP INDEX IF EXISTS public.cong_thuc_luong_ma_cong_thuc_key;
DROP INDEX IF EXISTS public.co_cau_luong_chi_tiet_co_cau_luong_id_khoan_luong_id_key;
DROP INDEX IF EXISTS public.chi_tieu_kpi_template_id_ma_chi_tieu_key;
DROP INDEX IF EXISTS public.chi_tiet_nghi_phep_ngay_nhan_vien_id_ngay_loai_nghi_id_key;
DROP INDEX IF EXISTS public.chi_tiet_nghi_phep_ngay_nhan_vien_id_ngay_idx;
DROP INDEX IF EXISTS public.chi_tiet_nghi_phep_ngay_don_nghi_phep_id_idx;
DROP INDEX IF EXISTS public.chi_tiet_cham_cong_nhan_vien_id_ngay_key;
DROP INDEX IF EXISTS public.chi_tiet_cham_cong_nhan_vien_id_idx;
DROP INDEX IF EXISTS public.chi_tiet_cham_cong_ngay_idx;
DROP INDEX IF EXISTS public.chi_tiet_cham_cong_ca_lam_viec_id_idx;
DROP INDEX IF EXISTS public.chi_tiet_bang_ung_luong_phong_ban_id_idx;
DROP INDEX IF EXISTS public.chi_tiet_bang_ung_luong_nhan_vien_id_idx;
DROP INDEX IF EXISTS public.chi_tiet_bang_ung_luong_bang_ung_luong_id_nhan_vien_id_key;
DROP INDEX IF EXISTS public.chi_tiet_bang_ung_luong_bang_ung_luong_id_idx;
DROP INDEX IF EXISTS public.chi_tiet_bang_luong_nhan_vien_id_idx;
DROP INDEX IF EXISTS public.chi_tiet_bang_luong_khoan_luong_id_idx;
DROP INDEX IF EXISTS public.chi_tiet_bang_luong_bang_luong_id_nhan_vien_id_khoan_luong__key;
DROP INDEX IF EXISTS public.chi_tiet_bang_luong_bang_luong_id_idx;
DROP INDEX IF EXISTS public.chat_history_user_id_idx;
DROP INDEX IF EXISTS public.chat_history_session_id_idx;
DROP INDEX IF EXISTS public.chat_history_created_at_idx;
DROP INDEX IF EXISTS public.chat_analytics_session_id_idx;
DROP INDEX IF EXISTS public.chat_analytics_created_at_idx;
DROP INDEX IF EXISTS public.cham_cong_thang_nam_idx;
DROP INDEX IF EXISTS public.cham_cong_nhan_vien_id_thang_nam_key;
DROP INDEX IF EXISTS public.cham_cong_nhan_vien_id_idx;
DROP INDEX IF EXISTS public.cau_hinh_thuong_kpi_nam_xep_loai_key;
DROP INDEX IF EXISTS public.cau_hinh_thue_tncn_nam_key;
DROP INDEX IF EXISTS public.cau_hinh_phat_cham_cong_nam_key;
DROP INDEX IF EXISTS public.cau_hinh_import_phong_ban_phong_ban_id_loai_import_key;
DROP INDEX IF EXISTS public.cau_hinh_geofence_trang_thai_idx;
DROP INDEX IF EXISTS public.cau_hinh_geofence_phong_ban_id_idx;
DROP INDEX IF EXISTS public.cau_hinh_don_gia_ma_bien_phong_ban_id_key;
DROP INDEX IF EXISTS public.cau_hinh_don_gia_ma_bien_key;
DROP INDEX IF EXISTS public.cau_hinh_bhxh_nam_key;
DROP INDEX IF EXISTS public.ca_lam_viec_trang_thai_idx;
DROP INDEX IF EXISTS public.ca_lam_viec_phong_ban_id_idx;
DROP INDEX IF EXISTS public.ca_lam_viec_ma_ca_key;
DROP INDEX IF EXISTS public.bien_so_cong_thuc_cong_thuc_id_ten_bien_key;
DROP INDEX IF EXISTS public.bang_ung_luong_trang_thai_idx;
DROP INDEX IF EXISTS public.bang_ung_luong_thang_nam_tu_ngay_den_ngay_phong_ban_id_key;
DROP INDEX IF EXISTS public.bang_ung_luong_thang_nam_idx;
DROP INDEX IF EXISTS public.bang_ung_luong_phong_ban_id_idx;
DROP INDEX IF EXISTS public.bang_ung_luong_ma_bang_ung_luong_key;
DROP INDEX IF EXISTS public.bang_tinh_thue_bang_luong_id_nhan_vien_id_key;
DROP INDEX IF EXISTS public.bang_tinh_bhxh_bang_luong_id_nhan_vien_id_key;
DROP INDEX IF EXISTS public.bang_luong_trang_thai_idx;
DROP INDEX IF EXISTS public.bang_luong_thang_nam_phong_ban_id_key;
DROP INDEX IF EXISTS public.bang_luong_thang_nam_idx;
DROP INDEX IF EXISTS public.bang_luong_quy_che_bang_luong_id_quy_che_id_key;
DROP INDEX IF EXISTS public.bang_luong_phong_ban_id_idx;
DROP INDEX IF EXISTS public.bang_ghi_cham_cong_gps_trang_thai_idx;
DROP INDEX IF EXISTS public.bang_ghi_cham_cong_gps_thoi_gian_idx;
DROP INDEX IF EXISTS public.bang_ghi_cham_cong_gps_nhan_vien_id_thoi_gian_idx;
DROP INDEX IF EXISTS public.bang_ghi_cham_cong_gps_geofence_id_idx;
DROP INDEX IF EXISTS public.bac_thue_tncn_cau_hinh_thue_id_bac_key;
DROP INDEX IF EXISTS public.audit_sua_du_lieu_sua_luc_idx;
DROP INDEX IF EXISTS public.audit_sua_du_lieu_sua_boi_idx;
DROP INDEX IF EXISTS public.audit_sua_du_lieu_loai_du_lieu_idx;
DROP INDEX IF EXISTS public.audit_sua_du_lieu_ban_ghi_id_idx;
DROP INDEX IF EXISTS public.audit_log_nguoi_dung_id_idx;
DROP INDEX IF EXISTS public.audit_log_ngay_tao_idx;
DROP INDEX IF EXISTS public.audit_log_bang_du_lieu_idx;
DROP INDEX IF EXISTS public.ai_rule_audit_trang_thai_idx;
DROP INDEX IF EXISTS public.ai_rule_audit_tao_luc_idx;
DROP INDEX IF EXISTS public.ai_rule_audit_quy_che_id_idx;
DROP INDEX IF EXISTS public.ai_rule_audit_nguoi_tao_id_idx;
ALTER TABLE IF EXISTS ONLY public.yeu_cau_sua_cong DROP CONSTRAINT IF EXISTS yeu_cau_sua_cong_pkey;
ALTER TABLE IF EXISTS ONLY public.vai_tro_quyen DROP CONSTRAINT IF EXISTS vai_tro_quyen_pkey;
ALTER TABLE IF EXISTS ONLY public.vai_tro DROP CONSTRAINT IF EXISTS vai_tro_pkey;
ALTER TABLE IF EXISTS ONLY public.thong_tin_cong_ty DROP CONSTRAINT IF EXISTS thong_tin_cong_ty_pkey;
ALTER TABLE IF EXISTS ONLY public.thong_bao DROP CONSTRAINT IF EXISTS thong_bao_pkey;
ALTER TABLE IF EXISTS ONLY public.thiet_bi_nhan_vien DROP CONSTRAINT IF EXISTS thiet_bi_nhan_vien_pkey;
ALTER TABLE IF EXISTS ONLY public.template_kpi DROP CONSTRAINT IF EXISTS template_kpi_pkey;
ALTER TABLE IF EXISTS ONLY public.su_kien_thuong_phat DROP CONSTRAINT IF EXISTS su_kien_thuong_phat_pkey;
ALTER TABLE IF EXISTS ONLY public.snapshot_san_luong_chia_hang DROP CONSTRAINT IF EXISTS snapshot_san_luong_chia_hang_pkey;
ALTER TABLE IF EXISTS ONLY public.snapshot_giao_hang DROP CONSTRAINT IF EXISTS snapshot_giao_hang_pkey;
ALTER TABLE IF EXISTS ONLY public.snapshot_chi_tiet_bang_ung_luong DROP CONSTRAINT IF EXISTS snapshot_chi_tiet_bang_ung_luong_pkey;
ALTER TABLE IF EXISTS ONLY public.snapshot_bang_ung_luong DROP CONSTRAINT IF EXISTS snapshot_bang_ung_luong_pkey;
ALTER TABLE IF EXISTS ONLY public.snapshot_bang_luong DROP CONSTRAINT IF EXISTS snapshot_bang_luong_pkey;
ALTER TABLE IF EXISTS ONLY public.san_luong_chia_hang DROP CONSTRAINT IF EXISTS san_luong_chia_hang_pkey;
ALTER TABLE IF EXISTS ONLY public.rule_trace DROP CONSTRAINT IF EXISTS rule_trace_pkey;
ALTER TABLE IF EXISTS ONLY public.request_workflow_config DROP CONSTRAINT IF EXISTS request_workflow_config_pkey;
ALTER TABLE IF EXISTS ONLY public.request_mapping_cham_cong DROP CONSTRAINT IF EXISTS request_mapping_cham_cong_pkey;
ALTER TABLE IF EXISTS ONLY public.quyen DROP CONSTRAINT IF EXISTS quyen_pkey;
ALTER TABLE IF EXISTS ONLY public.quy_che_rule DROP CONSTRAINT IF EXISTS quy_che_rule_pkey;
ALTER TABLE IF EXISTS ONLY public.quy_che DROP CONSTRAINT IF EXISTS quy_che_pkey;
ALTER TABLE IF EXISTS ONLY public.phu_cap_nhan_vien DROP CONSTRAINT IF EXISTS phu_cap_nhan_vien_pkey;
ALTER TABLE IF EXISTS ONLY public.phong_ban DROP CONSTRAINT IF EXISTS phong_ban_pkey;
ALTER TABLE IF EXISTS ONLY public.phieu_dieu_chinh DROP CONSTRAINT IF EXISTS phieu_dieu_chinh_pkey;
ALTER TABLE IF EXISTS ONLY public.phien_dang_nhap DROP CONSTRAINT IF EXISTS phien_dang_nhap_pkey;
ALTER TABLE IF EXISTS ONLY public.phan_quyen_phong_ban DROP CONSTRAINT IF EXISTS phan_quyen_phong_ban_pkey;
ALTER TABLE IF EXISTS ONLY public.nhom_nhan_vien DROP CONSTRAINT IF EXISTS nhom_nhan_vien_pkey;
ALTER TABLE IF EXISTS ONLY public.nhan_vien_trach_nhiem DROP CONSTRAINT IF EXISTS nhan_vien_trach_nhiem_pkey;
ALTER TABLE IF EXISTS ONLY public.nhan_vien_thuoc_nhom DROP CONSTRAINT IF EXISTS nhan_vien_thuoc_nhom_pkey;
ALTER TABLE IF EXISTS ONLY public.nhan_vien_thue_bh DROP CONSTRAINT IF EXISTS nhan_vien_thue_bh_pkey;
ALTER TABLE IF EXISTS ONLY public.nhan_vien DROP CONSTRAINT IF EXISTS nhan_vien_pkey;
ALTER TABLE IF EXISTS ONLY public.nhan_vien_phong_ban DROP CONSTRAINT IF EXISTS nhan_vien_phong_ban_pkey;
ALTER TABLE IF EXISTS ONLY public.nhan_vien_ngan_hang DROP CONSTRAINT IF EXISTS nhan_vien_ngan_hang_pkey;
ALTER TABLE IF EXISTS ONLY public.nhan_vien_hop_dong DROP CONSTRAINT IF EXISTS nhan_vien_hop_dong_pkey;
ALTER TABLE IF EXISTS ONLY public.nguoi_phu_thuoc DROP CONSTRAINT IF EXISTS nguoi_phu_thuoc_pkey;
ALTER TABLE IF EXISTS ONLY public.nguoi_dung_vai_tro DROP CONSTRAINT IF EXISTS nguoi_dung_vai_tro_pkey;
ALTER TABLE IF EXISTS ONLY public.nguoi_dung DROP CONSTRAINT IF EXISTS nguoi_dung_pkey;
ALTER TABLE IF EXISTS ONLY public.ngay_cong_bang_luong DROP CONSTRAINT IF EXISTS ngay_cong_bang_luong_pkey;
ALTER TABLE IF EXISTS ONLY public.mapping_excel DROP CONSTRAINT IF EXISTS mapping_excel_pkey;
ALTER TABLE IF EXISTS ONLY public.lich_su_thiet_bi DROP CONSTRAINT IF EXISTS lich_su_thiet_bi_pkey;
ALTER TABLE IF EXISTS ONLY public.lich_su_sua_cong DROP CONSTRAINT IF EXISTS lich_su_sua_cong_pkey;
ALTER TABLE IF EXISTS ONLY public.lich_su_import DROP CONSTRAINT IF EXISTS lich_su_import_pkey;
ALTER TABLE IF EXISTS ONLY public.lich_su_cong_thuc DROP CONSTRAINT IF EXISTS lich_su_cong_thuc_pkey;
ALTER TABLE IF EXISTS ONLY public.lich_su_chinh_sua DROP CONSTRAINT IF EXISTS lich_su_chinh_sua_pkey;
ALTER TABLE IF EXISTS ONLY public.lich_phan_ca DROP CONSTRAINT IF EXISTS lich_phan_ca_pkey;
ALTER TABLE IF EXISTS ONLY public.lich_phan_ca_chi_tiet DROP CONSTRAINT IF EXISTS lich_phan_ca_chi_tiet_pkey;
ALTER TABLE IF EXISTS ONLY public.ky_danh_gia_kpi DROP CONSTRAINT IF EXISTS ky_danh_gia_kpi_pkey;
ALTER TABLE IF EXISTS ONLY public.khoan_luong DROP CONSTRAINT IF EXISTS khoan_luong_pkey;
ALTER TABLE IF EXISTS ONLY public.ket_qua_kpi DROP CONSTRAINT IF EXISTS ket_qua_kpi_pkey;
ALTER TABLE IF EXISTS ONLY public.giao_hang DROP CONSTRAINT IF EXISTS giao_hang_pkey;
ALTER TABLE IF EXISTS ONLY public.don_yeu_cau DROP CONSTRAINT IF EXISTS don_yeu_cau_pkey;
ALTER TABLE IF EXISTS ONLY public.don_vi_con DROP CONSTRAINT IF EXISTS don_vi_con_pkey;
ALTER TABLE IF EXISTS ONLY public.don_nghi_phep DROP CONSTRAINT IF EXISTS don_nghi_phep_pkey;
ALTER TABLE IF EXISTS ONLY public.danh_muc_su_kien DROP CONSTRAINT IF EXISTS danh_muc_su_kien_pkey;
ALTER TABLE IF EXISTS ONLY public.danh_muc_loai_yeu_cau DROP CONSTRAINT IF EXISTS danh_muc_loai_yeu_cau_pkey;
ALTER TABLE IF EXISTS ONLY public.danh_muc_loai_nghi DROP CONSTRAINT IF EXISTS danh_muc_loai_nghi_pkey;
ALTER TABLE IF EXISTS ONLY public.danh_gia_kpi_nhan_vien DROP CONSTRAINT IF EXISTS danh_gia_kpi_nhan_vien_pkey;
ALTER TABLE IF EXISTS ONLY public.cong_thuc_luong DROP CONSTRAINT IF EXISTS cong_thuc_luong_pkey;
ALTER TABLE IF EXISTS ONLY public.co_cau_luong DROP CONSTRAINT IF EXISTS co_cau_luong_pkey;
ALTER TABLE IF EXISTS ONLY public.co_cau_luong_chi_tiet DROP CONSTRAINT IF EXISTS co_cau_luong_chi_tiet_pkey;
ALTER TABLE IF EXISTS ONLY public.chi_tieu_kpi DROP CONSTRAINT IF EXISTS chi_tieu_kpi_pkey;
ALTER TABLE IF EXISTS ONLY public.chi_tiet_phieu_dieu_chinh DROP CONSTRAINT IF EXISTS chi_tiet_phieu_dieu_chinh_pkey;
ALTER TABLE IF EXISTS ONLY public.chi_tiet_nghi_phep_ngay DROP CONSTRAINT IF EXISTS chi_tiet_nghi_phep_ngay_pkey;
ALTER TABLE IF EXISTS ONLY public.chi_tiet_cham_cong DROP CONSTRAINT IF EXISTS chi_tiet_cham_cong_pkey;
ALTER TABLE IF EXISTS ONLY public.chi_tiet_bang_ung_luong DROP CONSTRAINT IF EXISTS chi_tiet_bang_ung_luong_pkey;
ALTER TABLE IF EXISTS ONLY public.chi_tiet_bang_luong DROP CONSTRAINT IF EXISTS chi_tiet_bang_luong_pkey;
ALTER TABLE IF EXISTS ONLY public.chat_history DROP CONSTRAINT IF EXISTS chat_history_pkey;
ALTER TABLE IF EXISTS ONLY public.chat_analytics DROP CONSTRAINT IF EXISTS chat_analytics_pkey;
ALTER TABLE IF EXISTS ONLY public.cham_cong DROP CONSTRAINT IF EXISTS cham_cong_pkey;
ALTER TABLE IF EXISTS ONLY public.cau_hinh_thuong_kpi DROP CONSTRAINT IF EXISTS cau_hinh_thuong_kpi_pkey;
ALTER TABLE IF EXISTS ONLY public.cau_hinh_thue_tncn DROP CONSTRAINT IF EXISTS cau_hinh_thue_tncn_pkey;
ALTER TABLE IF EXISTS ONLY public.cau_hinh_phat_cham_cong DROP CONSTRAINT IF EXISTS cau_hinh_phat_cham_cong_pkey;
ALTER TABLE IF EXISTS ONLY public.cau_hinh_import_phong_ban DROP CONSTRAINT IF EXISTS cau_hinh_import_phong_ban_pkey;
ALTER TABLE IF EXISTS ONLY public.cau_hinh_geofence DROP CONSTRAINT IF EXISTS cau_hinh_geofence_pkey;
ALTER TABLE IF EXISTS ONLY public.cau_hinh_don_gia DROP CONSTRAINT IF EXISTS cau_hinh_don_gia_pkey;
ALTER TABLE IF EXISTS ONLY public.cau_hinh_bhxh DROP CONSTRAINT IF EXISTS cau_hinh_bhxh_pkey;
ALTER TABLE IF EXISTS ONLY public.ca_lam_viec DROP CONSTRAINT IF EXISTS ca_lam_viec_pkey;
ALTER TABLE IF EXISTS ONLY public.bien_so_cong_thuc DROP CONSTRAINT IF EXISTS bien_so_cong_thuc_pkey;
ALTER TABLE IF EXISTS ONLY public.bang_ung_luong DROP CONSTRAINT IF EXISTS bang_ung_luong_pkey;
ALTER TABLE IF EXISTS ONLY public.bang_tinh_thue DROP CONSTRAINT IF EXISTS bang_tinh_thue_pkey;
ALTER TABLE IF EXISTS ONLY public.bang_tinh_bhxh DROP CONSTRAINT IF EXISTS bang_tinh_bhxh_pkey;
ALTER TABLE IF EXISTS ONLY public.bang_luong_quy_che DROP CONSTRAINT IF EXISTS bang_luong_quy_che_pkey;
ALTER TABLE IF EXISTS ONLY public.bang_luong DROP CONSTRAINT IF EXISTS bang_luong_pkey;
ALTER TABLE IF EXISTS ONLY public.bang_ghi_cham_cong_gps DROP CONSTRAINT IF EXISTS bang_ghi_cham_cong_gps_pkey;
ALTER TABLE IF EXISTS ONLY public.bac_thue_tncn DROP CONSTRAINT IF EXISTS bac_thue_tncn_pkey;
ALTER TABLE IF EXISTS ONLY public.audit_sua_du_lieu DROP CONSTRAINT IF EXISTS audit_sua_du_lieu_pkey;
ALTER TABLE IF EXISTS ONLY public.audit_log DROP CONSTRAINT IF EXISTS audit_log_pkey;
ALTER TABLE IF EXISTS ONLY public.ai_rule_audit DROP CONSTRAINT IF EXISTS ai_rule_audit_pkey;
ALTER TABLE IF EXISTS public.yeu_cau_sua_cong ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.vai_tro_quyen ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.vai_tro ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.thong_tin_cong_ty ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.thong_bao ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.thiet_bi_nhan_vien ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.template_kpi ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.su_kien_thuong_phat ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.snapshot_san_luong_chia_hang ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.snapshot_giao_hang ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.snapshot_chi_tiet_bang_ung_luong ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.snapshot_bang_ung_luong ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.snapshot_bang_luong ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.san_luong_chia_hang ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.rule_trace ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.request_workflow_config ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.request_mapping_cham_cong ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.quyen ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.quy_che_rule ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.quy_che ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.phu_cap_nhan_vien ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.phong_ban ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.phieu_dieu_chinh ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.phien_dang_nhap ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.phan_quyen_phong_ban ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.nhom_nhan_vien ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.nhan_vien_trach_nhiem ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.nhan_vien_thuoc_nhom ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.nhan_vien_thue_bh ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.nhan_vien_phong_ban ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.nhan_vien_ngan_hang ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.nhan_vien_hop_dong ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.nhan_vien ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.nguoi_phu_thuoc ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.nguoi_dung_vai_tro ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.nguoi_dung ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.ngay_cong_bang_luong ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.mapping_excel ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.lich_su_thiet_bi ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.lich_su_sua_cong ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.lich_su_import ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.lich_su_cong_thuc ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.lich_su_chinh_sua ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.lich_phan_ca_chi_tiet ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.lich_phan_ca ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.ky_danh_gia_kpi ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.khoan_luong ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.ket_qua_kpi ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.giao_hang ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.don_yeu_cau ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.don_vi_con ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.don_nghi_phep ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.danh_muc_su_kien ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.danh_muc_loai_yeu_cau ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.danh_muc_loai_nghi ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.danh_gia_kpi_nhan_vien ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.cong_thuc_luong ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.co_cau_luong_chi_tiet ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.co_cau_luong ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.chi_tieu_kpi ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.chi_tiet_phieu_dieu_chinh ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.chi_tiet_nghi_phep_ngay ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.chi_tiet_cham_cong ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.chi_tiet_bang_ung_luong ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.chi_tiet_bang_luong ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.chat_history ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.chat_analytics ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.cham_cong ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.cau_hinh_thuong_kpi ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.cau_hinh_thue_tncn ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.cau_hinh_phat_cham_cong ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.cau_hinh_import_phong_ban ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.cau_hinh_geofence ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.cau_hinh_don_gia ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.cau_hinh_bhxh ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.ca_lam_viec ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.bien_so_cong_thuc ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.bang_ung_luong ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.bang_tinh_thue ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.bang_tinh_bhxh ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.bang_luong_quy_che ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.bang_luong ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.bang_ghi_cham_cong_gps ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.bac_thue_tncn ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.audit_sua_du_lieu ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.audit_log ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.ai_rule_audit ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.yeu_cau_sua_cong_id_seq;
DROP TABLE IF EXISTS public.yeu_cau_sua_cong;
DROP SEQUENCE IF EXISTS public.vai_tro_quyen_id_seq;
DROP TABLE IF EXISTS public.vai_tro_quyen;
DROP SEQUENCE IF EXISTS public.vai_tro_id_seq;
DROP TABLE IF EXISTS public.vai_tro;
DROP SEQUENCE IF EXISTS public.thong_tin_cong_ty_id_seq;
DROP TABLE IF EXISTS public.thong_tin_cong_ty;
DROP SEQUENCE IF EXISTS public.thong_bao_id_seq;
DROP TABLE IF EXISTS public.thong_bao;
DROP SEQUENCE IF EXISTS public.thiet_bi_nhan_vien_id_seq;
DROP TABLE IF EXISTS public.thiet_bi_nhan_vien;
DROP SEQUENCE IF EXISTS public.template_kpi_id_seq;
DROP TABLE IF EXISTS public.template_kpi;
DROP SEQUENCE IF EXISTS public.su_kien_thuong_phat_id_seq;
DROP TABLE IF EXISTS public.su_kien_thuong_phat;
DROP SEQUENCE IF EXISTS public.snapshot_san_luong_chia_hang_id_seq;
DROP TABLE IF EXISTS public.snapshot_san_luong_chia_hang;
DROP SEQUENCE IF EXISTS public.snapshot_giao_hang_id_seq;
DROP TABLE IF EXISTS public.snapshot_giao_hang;
DROP SEQUENCE IF EXISTS public.snapshot_chi_tiet_bang_ung_luong_id_seq;
DROP TABLE IF EXISTS public.snapshot_chi_tiet_bang_ung_luong;
DROP SEQUENCE IF EXISTS public.snapshot_bang_ung_luong_id_seq;
DROP TABLE IF EXISTS public.snapshot_bang_ung_luong;
DROP SEQUENCE IF EXISTS public.snapshot_bang_luong_id_seq;
DROP TABLE IF EXISTS public.snapshot_bang_luong;
DROP SEQUENCE IF EXISTS public.san_luong_chia_hang_id_seq;
DROP TABLE IF EXISTS public.san_luong_chia_hang;
DROP SEQUENCE IF EXISTS public.rule_trace_id_seq;
DROP TABLE IF EXISTS public.rule_trace;
DROP SEQUENCE IF EXISTS public.request_workflow_config_id_seq;
DROP TABLE IF EXISTS public.request_workflow_config;
DROP SEQUENCE IF EXISTS public.request_mapping_cham_cong_id_seq;
DROP TABLE IF EXISTS public.request_mapping_cham_cong;
DROP SEQUENCE IF EXISTS public.quyen_id_seq;
DROP TABLE IF EXISTS public.quyen;
DROP SEQUENCE IF EXISTS public.quy_che_rule_id_seq;
DROP TABLE IF EXISTS public.quy_che_rule;
DROP SEQUENCE IF EXISTS public.quy_che_id_seq;
DROP TABLE IF EXISTS public.quy_che;
DROP SEQUENCE IF EXISTS public.phu_cap_nhan_vien_id_seq;
DROP TABLE IF EXISTS public.phu_cap_nhan_vien;
DROP SEQUENCE IF EXISTS public.phong_ban_id_seq;
DROP TABLE IF EXISTS public.phong_ban;
DROP SEQUENCE IF EXISTS public.phieu_dieu_chinh_id_seq;
DROP TABLE IF EXISTS public.phieu_dieu_chinh;
DROP SEQUENCE IF EXISTS public.phien_dang_nhap_id_seq;
DROP TABLE IF EXISTS public.phien_dang_nhap;
DROP SEQUENCE IF EXISTS public.phan_quyen_phong_ban_id_seq;
DROP TABLE IF EXISTS public.phan_quyen_phong_ban;
DROP SEQUENCE IF EXISTS public.nhom_nhan_vien_id_seq;
DROP TABLE IF EXISTS public.nhom_nhan_vien;
DROP SEQUENCE IF EXISTS public.nhan_vien_trach_nhiem_id_seq;
DROP TABLE IF EXISTS public.nhan_vien_trach_nhiem;
DROP SEQUENCE IF EXISTS public.nhan_vien_thuoc_nhom_id_seq;
DROP TABLE IF EXISTS public.nhan_vien_thuoc_nhom;
DROP SEQUENCE IF EXISTS public.nhan_vien_thue_bh_id_seq;
DROP TABLE IF EXISTS public.nhan_vien_thue_bh;
DROP SEQUENCE IF EXISTS public.nhan_vien_phong_ban_id_seq;
DROP TABLE IF EXISTS public.nhan_vien_phong_ban;
DROP SEQUENCE IF EXISTS public.nhan_vien_ngan_hang_id_seq;
DROP TABLE IF EXISTS public.nhan_vien_ngan_hang;
DROP SEQUENCE IF EXISTS public.nhan_vien_id_seq;
DROP SEQUENCE IF EXISTS public.nhan_vien_hop_dong_id_seq;
DROP TABLE IF EXISTS public.nhan_vien_hop_dong;
DROP TABLE IF EXISTS public.nhan_vien;
DROP SEQUENCE IF EXISTS public.nguoi_phu_thuoc_id_seq;
DROP TABLE IF EXISTS public.nguoi_phu_thuoc;
DROP SEQUENCE IF EXISTS public.nguoi_dung_vai_tro_id_seq;
DROP TABLE IF EXISTS public.nguoi_dung_vai_tro;
DROP SEQUENCE IF EXISTS public.nguoi_dung_id_seq;
DROP TABLE IF EXISTS public.nguoi_dung;
DROP SEQUENCE IF EXISTS public.ngay_cong_bang_luong_id_seq;
DROP TABLE IF EXISTS public.ngay_cong_bang_luong;
DROP SEQUENCE IF EXISTS public.mapping_excel_id_seq;
DROP TABLE IF EXISTS public.mapping_excel;
DROP SEQUENCE IF EXISTS public.lich_su_thiet_bi_id_seq;
DROP TABLE IF EXISTS public.lich_su_thiet_bi;
DROP SEQUENCE IF EXISTS public.lich_su_sua_cong_id_seq;
DROP TABLE IF EXISTS public.lich_su_sua_cong;
DROP SEQUENCE IF EXISTS public.lich_su_import_id_seq;
DROP TABLE IF EXISTS public.lich_su_import;
DROP SEQUENCE IF EXISTS public.lich_su_cong_thuc_id_seq;
DROP TABLE IF EXISTS public.lich_su_cong_thuc;
DROP SEQUENCE IF EXISTS public.lich_su_chinh_sua_id_seq;
DROP TABLE IF EXISTS public.lich_su_chinh_sua;
DROP SEQUENCE IF EXISTS public.lich_phan_ca_id_seq;
DROP SEQUENCE IF EXISTS public.lich_phan_ca_chi_tiet_id_seq;
DROP TABLE IF EXISTS public.lich_phan_ca_chi_tiet;
DROP TABLE IF EXISTS public.lich_phan_ca;
DROP SEQUENCE IF EXISTS public.ky_danh_gia_kpi_id_seq;
DROP TABLE IF EXISTS public.ky_danh_gia_kpi;
DROP SEQUENCE IF EXISTS public.khoan_luong_id_seq;
DROP TABLE IF EXISTS public.khoan_luong;
DROP SEQUENCE IF EXISTS public.ket_qua_kpi_id_seq;
DROP TABLE IF EXISTS public.ket_qua_kpi;
DROP SEQUENCE IF EXISTS public.giao_hang_id_seq;
DROP TABLE IF EXISTS public.giao_hang;
DROP SEQUENCE IF EXISTS public.don_yeu_cau_id_seq;
DROP TABLE IF EXISTS public.don_yeu_cau;
DROP SEQUENCE IF EXISTS public.don_vi_con_id_seq;
DROP TABLE IF EXISTS public.don_vi_con;
DROP SEQUENCE IF EXISTS public.don_nghi_phep_id_seq;
DROP TABLE IF EXISTS public.don_nghi_phep;
DROP SEQUENCE IF EXISTS public.danh_muc_su_kien_id_seq;
DROP TABLE IF EXISTS public.danh_muc_su_kien;
DROP SEQUENCE IF EXISTS public.danh_muc_loai_yeu_cau_id_seq;
DROP TABLE IF EXISTS public.danh_muc_loai_yeu_cau;
DROP SEQUENCE IF EXISTS public.danh_muc_loai_nghi_id_seq;
DROP TABLE IF EXISTS public.danh_muc_loai_nghi;
DROP SEQUENCE IF EXISTS public.danh_gia_kpi_nhan_vien_id_seq;
DROP TABLE IF EXISTS public.danh_gia_kpi_nhan_vien;
DROP SEQUENCE IF EXISTS public.cong_thuc_luong_id_seq;
DROP TABLE IF EXISTS public.cong_thuc_luong;
DROP SEQUENCE IF EXISTS public.co_cau_luong_id_seq;
DROP SEQUENCE IF EXISTS public.co_cau_luong_chi_tiet_id_seq;
DROP TABLE IF EXISTS public.co_cau_luong_chi_tiet;
DROP TABLE IF EXISTS public.co_cau_luong;
DROP SEQUENCE IF EXISTS public.chi_tieu_kpi_id_seq;
DROP TABLE IF EXISTS public.chi_tieu_kpi;
DROP SEQUENCE IF EXISTS public.chi_tiet_phieu_dieu_chinh_id_seq;
DROP TABLE IF EXISTS public.chi_tiet_phieu_dieu_chinh;
DROP SEQUENCE IF EXISTS public.chi_tiet_nghi_phep_ngay_id_seq;
DROP TABLE IF EXISTS public.chi_tiet_nghi_phep_ngay;
DROP SEQUENCE IF EXISTS public.chi_tiet_cham_cong_id_seq;
DROP TABLE IF EXISTS public.chi_tiet_cham_cong;
DROP SEQUENCE IF EXISTS public.chi_tiet_bang_ung_luong_id_seq;
DROP TABLE IF EXISTS public.chi_tiet_bang_ung_luong;
DROP SEQUENCE IF EXISTS public.chi_tiet_bang_luong_id_seq;
DROP TABLE IF EXISTS public.chi_tiet_bang_luong;
DROP SEQUENCE IF EXISTS public.chat_history_id_seq;
DROP TABLE IF EXISTS public.chat_history;
DROP SEQUENCE IF EXISTS public.chat_analytics_id_seq;
DROP TABLE IF EXISTS public.chat_analytics;
DROP SEQUENCE IF EXISTS public.cham_cong_id_seq;
DROP TABLE IF EXISTS public.cham_cong;
DROP SEQUENCE IF EXISTS public.cau_hinh_thuong_kpi_id_seq;
DROP TABLE IF EXISTS public.cau_hinh_thuong_kpi;
DROP SEQUENCE IF EXISTS public.cau_hinh_thue_tncn_id_seq;
DROP TABLE IF EXISTS public.cau_hinh_thue_tncn;
DROP SEQUENCE IF EXISTS public.cau_hinh_phat_cham_cong_id_seq;
DROP TABLE IF EXISTS public.cau_hinh_phat_cham_cong;
DROP SEQUENCE IF EXISTS public.cau_hinh_import_phong_ban_id_seq;
DROP TABLE IF EXISTS public.cau_hinh_import_phong_ban;
DROP SEQUENCE IF EXISTS public.cau_hinh_geofence_id_seq;
DROP TABLE IF EXISTS public.cau_hinh_geofence;
DROP SEQUENCE IF EXISTS public.cau_hinh_don_gia_id_seq;
DROP TABLE IF EXISTS public.cau_hinh_don_gia;
DROP SEQUENCE IF EXISTS public.cau_hinh_bhxh_id_seq;
DROP TABLE IF EXISTS public.cau_hinh_bhxh;
DROP SEQUENCE IF EXISTS public.ca_lam_viec_id_seq;
DROP TABLE IF EXISTS public.ca_lam_viec;
DROP SEQUENCE IF EXISTS public.bien_so_cong_thuc_id_seq;
DROP TABLE IF EXISTS public.bien_so_cong_thuc;
DROP SEQUENCE IF EXISTS public.bang_ung_luong_id_seq;
DROP TABLE IF EXISTS public.bang_ung_luong;
DROP SEQUENCE IF EXISTS public.bang_tinh_thue_id_seq;
DROP TABLE IF EXISTS public.bang_tinh_thue;
DROP SEQUENCE IF EXISTS public.bang_tinh_bhxh_id_seq;
DROP TABLE IF EXISTS public.bang_tinh_bhxh;
DROP SEQUENCE IF EXISTS public.bang_luong_quy_che_id_seq;
DROP TABLE IF EXISTS public.bang_luong_quy_che;
DROP SEQUENCE IF EXISTS public.bang_luong_id_seq;
DROP TABLE IF EXISTS public.bang_luong;
DROP SEQUENCE IF EXISTS public.bang_ghi_cham_cong_gps_id_seq;
DROP TABLE IF EXISTS public.bang_ghi_cham_cong_gps;
DROP SEQUENCE IF EXISTS public.bac_thue_tncn_id_seq;
DROP TABLE IF EXISTS public.bac_thue_tncn;
DROP SEQUENCE IF EXISTS public.audit_sua_du_lieu_id_seq;
DROP TABLE IF EXISTS public.audit_sua_du_lieu;
DROP SEQUENCE IF EXISTS public.audit_log_id_seq;
DROP TABLE IF EXISTS public.audit_log;
DROP SEQUENCE IF EXISTS public.ai_rule_audit_id_seq;
DROP TABLE IF EXISTS public.ai_rule_audit;
DROP TYPE IF EXISTS public.xep_loai_kpi;
DROP TYPE IF EXISTS public.trang_thai_su_kien;
DROP TYPE IF EXISTS public.trang_thai_quy_che;
DROP TYPE IF EXISTS public.trang_thai_phu_cap;
DROP TYPE IF EXISTS public.trang_thai_phieu_dc;
DROP TYPE IF EXISTS public.trang_thai_phien;
DROP TYPE IF EXISTS public.trang_thai_nhan_vien;
DROP TYPE IF EXISTS public.trang_thai_nguoi_dung;
DROP TYPE IF EXISTS public.trang_thai_lich_ca;
DROP TYPE IF EXISTS public.trang_thai_ky_danh_gia;
DROP TYPE IF EXISTS public.trang_thai_import;
DROP TYPE IF EXISTS public.trang_thai_hop_dong;
DROP TYPE IF EXISTS public.trang_thai_don_yeu_cau;
DROP TYPE IF EXISTS public.trang_thai_danh_gia_kpi;
DROP TYPE IF EXISTS public.trang_thai_cham_cong;
DROP TYPE IF EXISTS public.trang_thai_bang_ung_luong;
DROP TYPE IF EXISTS public.trang_thai_bang_luong;
DROP TYPE IF EXISTS public.trang_thai_ai_audit;
DROP TYPE IF EXISTS public.nguon_du_lieu;
DROP TYPE IF EXISTS public.nguon_chi_tiet;
DROP TYPE IF EXISTS public.loai_thong_bao;
DROP TYPE IF EXISTS public.loai_su_kien;
DROP TYPE IF EXISTS public.loai_rule;
DROP TYPE IF EXISTS public.loai_nhan_vien;
DROP TYPE IF EXISTS public.loai_ngay_cong;
DROP TYPE IF EXISTS public.loai_ky_danh_gia;
DROP TYPE IF EXISTS public.loai_khoan_luong;
DROP TYPE IF EXISTS public.loai_import;
DROP TYPE IF EXISTS public.loai_hop_dong;
DROP TYPE IF EXISTS public.loai_dieu_chinh;
DROP TYPE IF EXISTS public.loai_chi_tieu_kpi;
DROP TYPE IF EXISTS public.kieu_du_lieu;
DROP TYPE IF EXISTS public.hanh_dong_audit;
DROP TYPE IF EXISTS public.gioi_tinh;
DROP TYPE IF EXISTS public.che_do_gop;
DROP TYPE IF EXISTS public.cach_tinh_luong;
DROP TYPE IF EXISTS public."TrangThaiDonNghiPhep";
--
-- Name: TrangThaiDonNghiPhep; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TrangThaiDonNghiPhep" AS ENUM (
    'NHAP',
    'GUI_DUYET',
    'DA_DUYET',
    'TU_CHOI',
    'HUY'
);


ALTER TYPE public."TrangThaiDonNghiPhep" OWNER TO postgres;

--
-- Name: cach_tinh_luong; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.cach_tinh_luong AS ENUM (
    'LUONG_THANG_CO_DINH',
    'THEO_NGAY_CONG',
    'CHUYEN_CAN_DIEU_KIEN'
);


ALTER TYPE public.cach_tinh_luong OWNER TO postgres;

--
-- Name: che_do_gop; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.che_do_gop AS ENUM (
    'CONG_DON',
    'GHI_DE'
);


ALTER TYPE public.che_do_gop OWNER TO postgres;

--
-- Name: gioi_tinh; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.gioi_tinh AS ENUM (
    'NAM',
    'NU',
    'KHAC'
);


ALTER TYPE public.gioi_tinh OWNER TO postgres;

--
-- Name: hanh_dong_audit; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.hanh_dong_audit AS ENUM (
    'TAO_MOI',
    'CAP_NHAT',
    'XOA',
    'DANG_NHAP',
    'DANG_XUAT',
    'CHOT_LUONG',
    'MO_KHOA',
    'DUYET',
    'TU_CHOI',
    'IMPORT',
    'EXPORT',
    'CHAY_RULE_ENGINE'
);


ALTER TYPE public.hanh_dong_audit OWNER TO postgres;

--
-- Name: kieu_du_lieu; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.kieu_du_lieu AS ENUM (
    'SO',
    'TIEN',
    'PHAN_TRAM',
    'NGAY',
    'CHUOI'
);


ALTER TYPE public.kieu_du_lieu OWNER TO postgres;

--
-- Name: loai_chi_tieu_kpi; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.loai_chi_tieu_kpi AS ENUM (
    'SO',
    'PHAN_TRAM',
    'TIEN',
    'THOI_GIAN',
    'DANH_GIA'
);


ALTER TYPE public.loai_chi_tieu_kpi OWNER TO postgres;

--
-- Name: loai_dieu_chinh; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.loai_dieu_chinh AS ENUM (
    'TANG',
    'GIAM',
    'THAY_THE'
);


ALTER TYPE public.loai_dieu_chinh OWNER TO postgres;

--
-- Name: loai_hop_dong; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.loai_hop_dong AS ENUM (
    'THU_VIEC',
    '1_NAM',
    '3_NAM',
    'VO_THOI_HAN'
);


ALTER TYPE public.loai_hop_dong OWNER TO postgres;

--
-- Name: loai_import; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.loai_import AS ENUM (
    'CHIA_HANG',
    'GIAO_HANG'
);


ALTER TYPE public.loai_import OWNER TO postgres;

--
-- Name: loai_khoan_luong; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.loai_khoan_luong AS ENUM (
    'THU_NHAP',
    'KHAU_TRU'
);


ALTER TYPE public.loai_khoan_luong OWNER TO postgres;

--
-- Name: loai_ky_danh_gia; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.loai_ky_danh_gia AS ENUM (
    'THANG',
    'QUY',
    'NAM'
);


ALTER TYPE public.loai_ky_danh_gia OWNER TO postgres;

--
-- Name: loai_ngay_cong; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.loai_ngay_cong AS ENUM (
    'NGAY_THUONG',
    'THU_BAY',
    'CHU_NHAT',
    'NGAY_LE'
);


ALTER TYPE public.loai_ngay_cong OWNER TO postgres;

--
-- Name: loai_nhan_vien; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.loai_nhan_vien AS ENUM (
    'THU_VIEC',
    'CHINH_THUC',
    'HOC_VIEC',
    'THUC_TAP',
    'CONG_TAC_VIEN',
    'THOI_VU'
);


ALTER TYPE public.loai_nhan_vien OWNER TO postgres;

--
-- Name: loai_rule; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.loai_rule AS ENUM (
    'CO_DINH',
    'THEO_HE_SO',
    'BAC_THANG',
    'THEO_SU_KIEN',
    'CONG_THUC'
);


ALTER TYPE public.loai_rule OWNER TO postgres;

--
-- Name: loai_su_kien; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.loai_su_kien AS ENUM (
    'THUONG',
    'PHAT'
);


ALTER TYPE public.loai_su_kien OWNER TO postgres;

--
-- Name: loai_thong_bao; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.loai_thong_bao AS ENUM (
    'YEU_CAU_MOI',
    'YEU_CAU_DA_DUYET',
    'YEU_CAU_TU_CHOI',
    'NGHI_PHEP_MOI',
    'NGHI_PHEP_DA_DUYET',
    'NGHI_PHEP_TU_CHOI',
    'LICH_PHAN_CA',
    'PHIEU_LUONG',
    'NHAC_NHO',
    'HE_THONG'
);


ALTER TYPE public.loai_thong_bao OWNER TO postgres;

--
-- Name: nguon_chi_tiet; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.nguon_chi_tiet AS ENUM (
    'CO_DINH',
    'NHAP_TAY',
    'CHAM_CONG',
    'RULE',
    'PHAT_SINH',
    'DIEU_CHINH',
    'UNG_LUONG'
);


ALTER TYPE public.nguon_chi_tiet OWNER TO postgres;

--
-- Name: nguon_du_lieu; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.nguon_du_lieu AS ENUM (
    'IMPORT_EXCEL',
    'ADMIN_SUA',
    'NHAP_TAY'
);


ALTER TYPE public.nguon_du_lieu OWNER TO postgres;

--
-- Name: trang_thai_ai_audit; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.trang_thai_ai_audit AS ENUM (
    'DE_XUAT',
    'DA_AP_DUNG',
    'HUY'
);


ALTER TYPE public.trang_thai_ai_audit OWNER TO postgres;

--
-- Name: trang_thai_bang_luong; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.trang_thai_bang_luong AS ENUM (
    'NHAP',
    'DA_CHOT',
    'KHOA'
);


ALTER TYPE public.trang_thai_bang_luong OWNER TO postgres;

--
-- Name: trang_thai_bang_ung_luong; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.trang_thai_bang_ung_luong AS ENUM (
    'NHAP',
    'DA_CHOT',
    'DA_KHOA'
);


ALTER TYPE public.trang_thai_bang_ung_luong OWNER TO postgres;

--
-- Name: trang_thai_cham_cong; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.trang_thai_cham_cong AS ENUM (
    'DI_LAM',
    'NGHI_PHEP',
    'NGHI_KHONG_LUONG',
    'NGHI_LE',
    'NGHI_BENH',
    'CONG_TAC',
    'LAM_TU_XA'
);


ALTER TYPE public.trang_thai_cham_cong OWNER TO postgres;

--
-- Name: trang_thai_danh_gia_kpi; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.trang_thai_danh_gia_kpi AS ENUM (
    'NHAP',
    'CHO_DUYET',
    'DA_DUYET',
    'TU_CHOI'
);


ALTER TYPE public.trang_thai_danh_gia_kpi OWNER TO postgres;

--
-- Name: trang_thai_don_yeu_cau; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.trang_thai_don_yeu_cau AS ENUM (
    'NHAP',
    'CHO_DUYET_1',
    'CHO_DUYET_2',
    'DA_DUYET',
    'TU_CHOI',
    'HUY'
);


ALTER TYPE public.trang_thai_don_yeu_cau OWNER TO postgres;

--
-- Name: trang_thai_hop_dong; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.trang_thai_hop_dong AS ENUM (
    'HIEU_LUC',
    'HET_HAN',
    'HUY_BO'
);


ALTER TYPE public.trang_thai_hop_dong OWNER TO postgres;

--
-- Name: trang_thai_import; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.trang_thai_import AS ENUM (
    'THANH_CONG',
    'THAT_BAI'
);


ALTER TYPE public.trang_thai_import OWNER TO postgres;

--
-- Name: trang_thai_ky_danh_gia; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.trang_thai_ky_danh_gia AS ENUM (
    'MO',
    'DONG',
    'DUYET',
    'HOAN_THANH'
);


ALTER TYPE public.trang_thai_ky_danh_gia OWNER TO postgres;

--
-- Name: trang_thai_lich_ca; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.trang_thai_lich_ca AS ENUM (
    'NHAP',
    'DA_CONG_BO',
    'HUY'
);


ALTER TYPE public.trang_thai_lich_ca OWNER TO postgres;

--
-- Name: trang_thai_nguoi_dung; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.trang_thai_nguoi_dung AS ENUM (
    'HOAT_DONG',
    'TAM_KHOA',
    'VO_HIEU_HOA'
);


ALTER TYPE public.trang_thai_nguoi_dung OWNER TO postgres;

--
-- Name: trang_thai_nhan_vien; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.trang_thai_nhan_vien AS ENUM (
    'DANG_LAM',
    'NGHI_VIEC',
    'TAM_NGHI'
);


ALTER TYPE public.trang_thai_nhan_vien OWNER TO postgres;

--
-- Name: trang_thai_phien; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.trang_thai_phien AS ENUM (
    'HOAT_DONG',
    'HET_HAN',
    'DANG_XUAT'
);


ALTER TYPE public.trang_thai_phien OWNER TO postgres;

--
-- Name: trang_thai_phieu_dc; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.trang_thai_phieu_dc AS ENUM (
    'CHO_DUYET',
    'DA_DUYET',
    'TU_CHOI',
    'HUY'
);


ALTER TYPE public.trang_thai_phieu_dc OWNER TO postgres;

--
-- Name: trang_thai_phu_cap; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.trang_thai_phu_cap AS ENUM (
    'HIEU_LUC',
    'TAM_DUNG',
    'KET_THUC'
);


ALTER TYPE public.trang_thai_phu_cap OWNER TO postgres;

--
-- Name: trang_thai_quy_che; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.trang_thai_quy_che AS ENUM (
    'NHAP',
    'HIEU_LUC',
    'TAM_DUNG',
    'NGUNG'
);


ALTER TYPE public.trang_thai_quy_che OWNER TO postgres;

--
-- Name: trang_thai_su_kien; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.trang_thai_su_kien AS ENUM (
    'NHAP',
    'DA_DUYET',
    'TU_CHOI',
    'HUY'
);


ALTER TYPE public.trang_thai_su_kien OWNER TO postgres;

--
-- Name: xep_loai_kpi; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.xep_loai_kpi AS ENUM (
    'XUAT_SAC',
    'TOT',
    'KHA',
    'TRUNG_BINH',
    'YEU'
);


ALTER TYPE public.xep_loai_kpi OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ai_rule_audit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ai_rule_audit (
    id integer NOT NULL,
    nguoi_tao_id integer,
    phong_ban_id integer,
    quy_che_id integer,
    prompt_goc text NOT NULL,
    response_json text NOT NULL,
    trang_thai public.trang_thai_ai_audit DEFAULT 'DE_XUAT'::public.trang_thai_ai_audit NOT NULL,
    rule_ap_dung_id integer,
    tao_luc timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.ai_rule_audit OWNER TO postgres;

--
-- Name: ai_rule_audit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ai_rule_audit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ai_rule_audit_id_seq OWNER TO postgres;

--
-- Name: ai_rule_audit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ai_rule_audit_id_seq OWNED BY public.ai_rule_audit.id;


--
-- Name: audit_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.audit_log (
    id integer NOT NULL,
    nguoi_dung_id integer,
    ten_dang_nhap text NOT NULL,
    hanh_dong public.hanh_dong_audit NOT NULL,
    bang_du_lieu text NOT NULL,
    ban_ghi_id text,
    du_lieu_cu text,
    du_lieu_moi text,
    dia_chi_ip text,
    user_agent text,
    mo_ta text,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.audit_log OWNER TO postgres;

--
-- Name: audit_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.audit_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.audit_log_id_seq OWNER TO postgres;

--
-- Name: audit_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.audit_log_id_seq OWNED BY public.audit_log.id;


--
-- Name: audit_sua_du_lieu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.audit_sua_du_lieu (
    id integer NOT NULL,
    loai_du_lieu public.loai_import NOT NULL,
    ban_ghi_id integer NOT NULL,
    du_lieu_truoc_json text NOT NULL,
    du_lieu_sau_json text NOT NULL,
    ly_do text NOT NULL,
    sua_boi integer NOT NULL,
    sua_luc timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.audit_sua_du_lieu OWNER TO postgres;

--
-- Name: audit_sua_du_lieu_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.audit_sua_du_lieu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.audit_sua_du_lieu_id_seq OWNER TO postgres;

--
-- Name: audit_sua_du_lieu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.audit_sua_du_lieu_id_seq OWNED BY public.audit_sua_du_lieu.id;


--
-- Name: bac_thue_tncn; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bac_thue_tncn (
    id integer NOT NULL,
    cau_hinh_thue_id integer NOT NULL,
    bac integer NOT NULL,
    tu_muc numeric(15,0) NOT NULL,
    den_muc numeric(15,0),
    thue_suat numeric(5,2) NOT NULL,
    so_tien_tru_nhanh numeric(15,0) NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.bac_thue_tncn OWNER TO postgres;

--
-- Name: bac_thue_tncn_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bac_thue_tncn_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bac_thue_tncn_id_seq OWNER TO postgres;

--
-- Name: bac_thue_tncn_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bac_thue_tncn_id_seq OWNED BY public.bac_thue_tncn.id;


--
-- Name: bang_ghi_cham_cong_gps; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bang_ghi_cham_cong_gps (
    id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    thoi_gian timestamp(3) without time zone NOT NULL,
    loai_cham_cong text NOT NULL,
    vi_do numeric(10,8),
    kinh_do numeric(11,8),
    do_chinh_xac_met integer,
    geofence_id integer,
    khoang_cach_met integer,
    trong_vung boolean,
    trang_thai text DEFAULT 'HOP_LE'::text NOT NULL,
    ghi_chu text,
    device_id character varying(100),
    user_agent character varying(500),
    ip_address character varying(50),
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.bang_ghi_cham_cong_gps OWNER TO postgres;

--
-- Name: bang_ghi_cham_cong_gps_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bang_ghi_cham_cong_gps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bang_ghi_cham_cong_gps_id_seq OWNER TO postgres;

--
-- Name: bang_ghi_cham_cong_gps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bang_ghi_cham_cong_gps_id_seq OWNED BY public.bang_ghi_cham_cong_gps.id;


--
-- Name: bang_luong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bang_luong (
    id integer NOT NULL,
    thang integer NOT NULL,
    nam integer NOT NULL,
    phong_ban_id integer NOT NULL,
    ten_bang_luong text,
    trang_thai public.trang_thai_bang_luong DEFAULT 'NHAP'::public.trang_thai_bang_luong NOT NULL,
    ngay_chot timestamp(3) without time zone,
    nguoi_chot text,
    ghi_chu text,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.bang_luong OWNER TO postgres;

--
-- Name: bang_luong_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bang_luong_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bang_luong_id_seq OWNER TO postgres;

--
-- Name: bang_luong_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bang_luong_id_seq OWNED BY public.bang_luong.id;


--
-- Name: bang_luong_quy_che; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bang_luong_quy_che (
    id integer NOT NULL,
    bang_luong_id integer NOT NULL,
    quy_che_id integer NOT NULL,
    ngay_ap_dung timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    nguoi_ap_dung text,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.bang_luong_quy_che OWNER TO postgres;

--
-- Name: bang_luong_quy_che_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bang_luong_quy_che_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bang_luong_quy_che_id_seq OWNER TO postgres;

--
-- Name: bang_luong_quy_che_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bang_luong_quy_che_id_seq OWNED BY public.bang_luong_quy_che.id;


--
-- Name: bang_tinh_bhxh; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bang_tinh_bhxh (
    id integer NOT NULL,
    bang_luong_id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    luong_dong_bhxh numeric(15,0) NOT NULL,
    bhxh_nv numeric(15,0) NOT NULL,
    bhyt_nv numeric(15,0) NOT NULL,
    bhtn_nv numeric(15,0) NOT NULL,
    tong_bh_nv numeric(15,0) NOT NULL,
    bhxh_dn numeric(15,0) NOT NULL,
    bhyt_dn numeric(15,0) NOT NULL,
    bhtn_dn numeric(15,0) NOT NULL,
    tong_bh_dn numeric(15,0) NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.bang_tinh_bhxh OWNER TO postgres;

--
-- Name: bang_tinh_bhxh_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bang_tinh_bhxh_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bang_tinh_bhxh_id_seq OWNER TO postgres;

--
-- Name: bang_tinh_bhxh_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bang_tinh_bhxh_id_seq OWNED BY public.bang_tinh_bhxh.id;


--
-- Name: bang_tinh_thue; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bang_tinh_thue (
    id integer NOT NULL,
    bang_luong_id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    thu_nhap_chiu_thue numeric(15,0) NOT NULL,
    giam_tru_ban_than numeric(15,0) NOT NULL,
    so_phu_thuoc integer DEFAULT 0 NOT NULL,
    giam_tru_phu_thuoc numeric(15,0) NOT NULL,
    giam_tru_bhxh numeric(15,0) NOT NULL,
    thu_nhap_tinh_thue numeric(15,0) NOT NULL,
    thue_tncn numeric(15,0) NOT NULL,
    bac_thue_ap_dung integer,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.bang_tinh_thue OWNER TO postgres;

--
-- Name: bang_tinh_thue_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bang_tinh_thue_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bang_tinh_thue_id_seq OWNER TO postgres;

--
-- Name: bang_tinh_thue_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bang_tinh_thue_id_seq OWNED BY public.bang_tinh_thue.id;


--
-- Name: bang_ung_luong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bang_ung_luong (
    id integer NOT NULL,
    ma_bang_ung_luong text NOT NULL,
    thang_nam text NOT NULL,
    tu_ngay date NOT NULL,
    den_ngay date NOT NULL,
    ngay_chi_tra date,
    phong_ban_id integer,
    trang_thai public.trang_thai_bang_ung_luong DEFAULT 'NHAP'::public.trang_thai_bang_ung_luong NOT NULL,
    cau_hinh_json text,
    tong_so_tien_ung numeric(15,0) DEFAULT 0 NOT NULL,
    so_nhan_vien_ung integer DEFAULT 0 NOT NULL,
    ghi_chu text,
    da_ghi_nhan_khau_tru boolean DEFAULT false NOT NULL,
    ref_phieu_dc_id integer,
    nguoi_tao text,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL,
    nguoi_chot text,
    ngay_chot timestamp(3) without time zone,
    nguoi_khoa text,
    ngay_khoa timestamp(3) without time zone
);


ALTER TABLE public.bang_ung_luong OWNER TO postgres;

--
-- Name: bang_ung_luong_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bang_ung_luong_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bang_ung_luong_id_seq OWNER TO postgres;

--
-- Name: bang_ung_luong_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bang_ung_luong_id_seq OWNED BY public.bang_ung_luong.id;


--
-- Name: bien_so_cong_thuc; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bien_so_cong_thuc (
    id integer NOT NULL,
    cong_thuc_id integer NOT NULL,
    ten_bien text NOT NULL,
    mo_ta text,
    kieu_du_lieu public.kieu_du_lieu DEFAULT 'SO'::public.kieu_du_lieu NOT NULL,
    nguon_du_lieu text,
    gia_tri_mac_dinh text,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.bien_so_cong_thuc OWNER TO postgres;

--
-- Name: bien_so_cong_thuc_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bien_so_cong_thuc_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bien_so_cong_thuc_id_seq OWNER TO postgres;

--
-- Name: bien_so_cong_thuc_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bien_so_cong_thuc_id_seq OWNED BY public.bien_so_cong_thuc.id;


--
-- Name: ca_lam_viec; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ca_lam_viec (
    id integer NOT NULL,
    ma_ca text NOT NULL,
    ten_ca text NOT NULL,
    gio_vao text NOT NULL,
    gio_ra text NOT NULL,
    nghi_giua_ca_phut integer DEFAULT 60 NOT NULL,
    grace_in_phut integer DEFAULT 5 NOT NULL,
    grace_late_phut integer DEFAULT 5 NOT NULL,
    is_ca_dem boolean DEFAULT false NOT NULL,
    phong_ban_id integer,
    mo_ta text,
    mau_hien_thi text,
    trang_thai boolean DEFAULT true NOT NULL,
    tao_boi integer,
    cap_nhat_boi integer,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.ca_lam_viec OWNER TO postgres;

--
-- Name: ca_lam_viec_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ca_lam_viec_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ca_lam_viec_id_seq OWNER TO postgres;

--
-- Name: ca_lam_viec_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ca_lam_viec_id_seq OWNED BY public.ca_lam_viec.id;


--
-- Name: cau_hinh_bhxh; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cau_hinh_bhxh (
    id integer NOT NULL,
    nam integer NOT NULL,
    ty_le_bhxh_nv numeric(5,2) NOT NULL,
    ty_le_bhxh_dn numeric(5,2) NOT NULL,
    ty_le_bhyt_nv numeric(5,2) NOT NULL,
    ty_le_bhyt_dn numeric(5,2) NOT NULL,
    ty_le_bhtn_nv numeric(5,2) NOT NULL,
    ty_le_bhtn_dn numeric(5,2) NOT NULL,
    luong_co_ban_toi_thieu numeric(15,0) NOT NULL,
    tran_dong_bhxh numeric(15,0) NOT NULL,
    luong_co_so numeric(15,0) NOT NULL,
    trang_thai boolean DEFAULT true NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.cau_hinh_bhxh OWNER TO postgres;

--
-- Name: cau_hinh_bhxh_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cau_hinh_bhxh_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cau_hinh_bhxh_id_seq OWNER TO postgres;

--
-- Name: cau_hinh_bhxh_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cau_hinh_bhxh_id_seq OWNED BY public.cau_hinh_bhxh.id;


--
-- Name: cau_hinh_don_gia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cau_hinh_don_gia (
    id integer NOT NULL,
    ma_bien text NOT NULL,
    ten_bien text NOT NULL,
    mo_ta text,
    gia_tri numeric(15,2) NOT NULL,
    don_vi text,
    phong_ban_id integer,
    trang_thai boolean DEFAULT true NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.cau_hinh_don_gia OWNER TO postgres;

--
-- Name: cau_hinh_don_gia_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cau_hinh_don_gia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cau_hinh_don_gia_id_seq OWNER TO postgres;

--
-- Name: cau_hinh_don_gia_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cau_hinh_don_gia_id_seq OWNED BY public.cau_hinh_don_gia.id;


--
-- Name: cau_hinh_geofence; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cau_hinh_geofence (
    id integer NOT NULL,
    ten_dia_diem character varying(200) NOT NULL,
    dia_chi character varying(500),
    vi_do numeric(10,8) NOT NULL,
    kinh_do numeric(11,8) NOT NULL,
    ban_kinh_met integer DEFAULT 100 NOT NULL,
    phong_ban_id integer,
    ap_dung_tat_ca boolean DEFAULT false NOT NULL,
    bat_buoc_gps boolean DEFAULT true NOT NULL,
    chan_ngoai_vung boolean DEFAULT false NOT NULL,
    trang_thai boolean DEFAULT true NOT NULL,
    tao_boi integer,
    cap_nhat_boi integer,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.cau_hinh_geofence OWNER TO postgres;

--
-- Name: cau_hinh_geofence_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cau_hinh_geofence_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cau_hinh_geofence_id_seq OWNER TO postgres;

--
-- Name: cau_hinh_geofence_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cau_hinh_geofence_id_seq OWNED BY public.cau_hinh_geofence.id;


--
-- Name: cau_hinh_import_phong_ban; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cau_hinh_import_phong_ban (
    id integer NOT NULL,
    phong_ban_id integer NOT NULL,
    loai_import text NOT NULL,
    bat_buoc_don_vi_con boolean DEFAULT false NOT NULL,
    gioi_han_so_dong integer DEFAULT 5000 NOT NULL,
    trang_thai text DEFAULT 'HOAT_DONG'::text NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.cau_hinh_import_phong_ban OWNER TO postgres;

--
-- Name: cau_hinh_import_phong_ban_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cau_hinh_import_phong_ban_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cau_hinh_import_phong_ban_id_seq OWNER TO postgres;

--
-- Name: cau_hinh_import_phong_ban_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cau_hinh_import_phong_ban_id_seq OWNED BY public.cau_hinh_import_phong_ban.id;


--
-- Name: cau_hinh_phat_cham_cong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cau_hinh_phat_cham_cong (
    id integer NOT NULL,
    nam integer NOT NULL,
    phat_di_muon_1_3_lan numeric(15,0) DEFAULT 0 NOT NULL,
    phat_di_muon_4_6_lan numeric(15,0) DEFAULT 0 NOT NULL,
    phat_di_muon_tren_6_lan numeric(15,0) DEFAULT 0 NOT NULL,
    phat_ve_som_1_3_lan numeric(15,0) DEFAULT 0 NOT NULL,
    phat_ve_som_4_6_lan numeric(15,0) DEFAULT 0 NOT NULL,
    phat_ve_som_tren_6_lan numeric(15,0) DEFAULT 0 NOT NULL,
    phat_nghi_khong_phep numeric(15,0) DEFAULT 0 NOT NULL,
    tru_luong_nghi_khong_phep boolean DEFAULT true NOT NULL,
    gio_vao_chuan text DEFAULT '08:00'::text NOT NULL,
    gio_ra_chuan text DEFAULT '17:00'::text NOT NULL,
    phut_cho_phep_tre integer DEFAULT 5 NOT NULL,
    mo_ta text,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.cau_hinh_phat_cham_cong OWNER TO postgres;

--
-- Name: cau_hinh_phat_cham_cong_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cau_hinh_phat_cham_cong_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cau_hinh_phat_cham_cong_id_seq OWNER TO postgres;

--
-- Name: cau_hinh_phat_cham_cong_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cau_hinh_phat_cham_cong_id_seq OWNED BY public.cau_hinh_phat_cham_cong.id;


--
-- Name: cau_hinh_thue_tncn; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cau_hinh_thue_tncn (
    id integer NOT NULL,
    nam integer NOT NULL,
    giam_tru_ban_than numeric(15,0) NOT NULL,
    giam_tru_phu_thuoc numeric(15,0) NOT NULL,
    trang_thai boolean DEFAULT true NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.cau_hinh_thue_tncn OWNER TO postgres;

--
-- Name: cau_hinh_thue_tncn_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cau_hinh_thue_tncn_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cau_hinh_thue_tncn_id_seq OWNER TO postgres;

--
-- Name: cau_hinh_thue_tncn_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cau_hinh_thue_tncn_id_seq OWNED BY public.cau_hinh_thue_tncn.id;


--
-- Name: cau_hinh_thuong_kpi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cau_hinh_thuong_kpi (
    id integer NOT NULL,
    nam integer NOT NULL,
    xep_loai public.xep_loai_kpi NOT NULL,
    diem_toi_thieu numeric(5,2) NOT NULL,
    diem_toi_da numeric(5,2) NOT NULL,
    he_so_thuong numeric(5,2) NOT NULL,
    mo_ta text,
    trang_thai boolean DEFAULT true NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.cau_hinh_thuong_kpi OWNER TO postgres;

--
-- Name: cau_hinh_thuong_kpi_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cau_hinh_thuong_kpi_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cau_hinh_thuong_kpi_id_seq OWNER TO postgres;

--
-- Name: cau_hinh_thuong_kpi_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cau_hinh_thuong_kpi_id_seq OWNED BY public.cau_hinh_thuong_kpi.id;


--
-- Name: cham_cong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cham_cong (
    id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    thang integer NOT NULL,
    nam integer NOT NULL,
    so_cong_chuan numeric(5,1) DEFAULT 26 NOT NULL,
    so_cong_thuc_te numeric(5,1) DEFAULT 0 NOT NULL,
    so_ngay_nghi_phep numeric(5,1) DEFAULT 0 NOT NULL,
    so_ngay_nghi_khong_luong numeric(5,1) DEFAULT 0 NOT NULL,
    so_gio_ot numeric(5,1) DEFAULT 0 NOT NULL,
    so_gio_ot_dem numeric(5,1) DEFAULT 0 NOT NULL,
    so_gio_ot_chu_nhat numeric(5,1) DEFAULT 0 NOT NULL,
    so_gio_ot_le numeric(5,1) DEFAULT 0 NOT NULL,
    so_lan_di_muon integer DEFAULT 0 NOT NULL,
    so_lan_ve_som integer DEFAULT 0 NOT NULL,
    ghi_chu text,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.cham_cong OWNER TO postgres;

--
-- Name: cham_cong_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cham_cong_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cham_cong_id_seq OWNER TO postgres;

--
-- Name: cham_cong_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cham_cong_id_seq OWNED BY public.cham_cong.id;


--
-- Name: chat_analytics; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chat_analytics (
    id integer NOT NULL,
    query text NOT NULL,
    sources_count integer DEFAULT 0 NOT NULL,
    user_id integer,
    session_id uuid,
    feedback integer,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.chat_analytics OWNER TO postgres;

--
-- Name: chat_analytics_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chat_analytics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chat_analytics_id_seq OWNER TO postgres;

--
-- Name: chat_analytics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chat_analytics_id_seq OWNED BY public.chat_analytics.id;


--
-- Name: chat_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chat_history (
    id integer NOT NULL,
    session_id uuid NOT NULL,
    user_id integer,
    role text NOT NULL,
    content text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.chat_history OWNER TO postgres;

--
-- Name: chat_history_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chat_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chat_history_id_seq OWNER TO postgres;

--
-- Name: chat_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chat_history_id_seq OWNED BY public.chat_history.id;


--
-- Name: chi_tiet_bang_luong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chi_tiet_bang_luong (
    id integer NOT NULL,
    bang_luong_id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    khoan_luong_id integer NOT NULL,
    so_tien numeric(15,0) DEFAULT 0 NOT NULL,
    nguon public.nguon_chi_tiet DEFAULT 'NHAP_TAY'::public.nguon_chi_tiet NOT NULL,
    ghi_chu text,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.chi_tiet_bang_luong OWNER TO postgres;

--
-- Name: chi_tiet_bang_luong_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chi_tiet_bang_luong_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chi_tiet_bang_luong_id_seq OWNER TO postgres;

--
-- Name: chi_tiet_bang_luong_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chi_tiet_bang_luong_id_seq OWNED BY public.chi_tiet_bang_luong.id;


--
-- Name: chi_tiet_bang_ung_luong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chi_tiet_bang_ung_luong (
    id integer NOT NULL,
    bang_ung_luong_id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    phong_ban_id integer NOT NULL,
    nhom_nhan_vien_id integer,
    tien_cong_luy_ke numeric(15,0) DEFAULT 0 NOT NULL,
    muc_toi_da_duoc_ung numeric(15,0) DEFAULT 0 NOT NULL,
    so_ngay_cong numeric(5,2) DEFAULT 0 NOT NULL,
    so_ngay_nghi numeric(5,2) DEFAULT 0 NOT NULL,
    so_ngay_nghi_khong_phep numeric(5,2) DEFAULT 0 NOT NULL,
    la_tam_tinh boolean DEFAULT false NOT NULL,
    duoc_phep_ung boolean DEFAULT true NOT NULL,
    ly_do_khong_dat text,
    so_tien_ung_de_xuat numeric(15,0) DEFAULT 0 NOT NULL,
    so_tien_ung_duyet numeric(15,0) DEFAULT 0 NOT NULL,
    ghi_chu text,
    locked_by_snapshot boolean DEFAULT false NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.chi_tiet_bang_ung_luong OWNER TO postgres;

--
-- Name: chi_tiet_bang_ung_luong_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chi_tiet_bang_ung_luong_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chi_tiet_bang_ung_luong_id_seq OWNER TO postgres;

--
-- Name: chi_tiet_bang_ung_luong_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chi_tiet_bang_ung_luong_id_seq OWNED BY public.chi_tiet_bang_ung_luong.id;


--
-- Name: chi_tiet_cham_cong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chi_tiet_cham_cong (
    id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    ngay timestamp(3) without time zone NOT NULL,
    gio_vao timestamp(3) without time zone,
    gio_ra timestamp(3) without time zone,
    loai_ngay public.loai_ngay_cong DEFAULT 'NGAY_THUONG'::public.loai_ngay_cong NOT NULL,
    trang_thai public.trang_thai_cham_cong DEFAULT 'DI_LAM'::public.trang_thai_cham_cong NOT NULL,
    so_gio_lam numeric(5,2) DEFAULT 0 NOT NULL,
    so_gio_ot numeric(5,2) DEFAULT 0 NOT NULL,
    ghi_chu text,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ca_lam_viec_id integer,
    gio_vao_du_kien timestamp(3) without time zone,
    gio_ra_du_kien timestamp(3) without time zone,
    phut_di_tre integer,
    phut_ve_som integer
);


ALTER TABLE public.chi_tiet_cham_cong OWNER TO postgres;

--
-- Name: chi_tiet_cham_cong_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chi_tiet_cham_cong_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chi_tiet_cham_cong_id_seq OWNER TO postgres;

--
-- Name: chi_tiet_cham_cong_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chi_tiet_cham_cong_id_seq OWNED BY public.chi_tiet_cham_cong.id;


--
-- Name: chi_tiet_nghi_phep_ngay; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chi_tiet_nghi_phep_ngay (
    id integer NOT NULL,
    don_nghi_phep_id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    ngay date NOT NULL,
    so_gio_nghi numeric(4,2) DEFAULT 8 NOT NULL,
    loai_nghi_id integer NOT NULL,
    co_tinh_luong boolean NOT NULL,
    co_tinh_chuyen_can boolean NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.chi_tiet_nghi_phep_ngay OWNER TO postgres;

--
-- Name: chi_tiet_nghi_phep_ngay_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chi_tiet_nghi_phep_ngay_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chi_tiet_nghi_phep_ngay_id_seq OWNER TO postgres;

--
-- Name: chi_tiet_nghi_phep_ngay_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chi_tiet_nghi_phep_ngay_id_seq OWNED BY public.chi_tiet_nghi_phep_ngay.id;


--
-- Name: chi_tiet_phieu_dieu_chinh; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chi_tiet_phieu_dieu_chinh (
    id integer NOT NULL,
    phieu_dieu_chinh_id integer NOT NULL,
    khoan_luong_id integer NOT NULL,
    so_tien_cu numeric(15,0) NOT NULL,
    so_tien_moi numeric(15,0) NOT NULL,
    chenh_lech numeric(15,0) NOT NULL,
    ghi_chu text,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.chi_tiet_phieu_dieu_chinh OWNER TO postgres;

--
-- Name: chi_tiet_phieu_dieu_chinh_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chi_tiet_phieu_dieu_chinh_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chi_tiet_phieu_dieu_chinh_id_seq OWNER TO postgres;

--
-- Name: chi_tiet_phieu_dieu_chinh_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chi_tiet_phieu_dieu_chinh_id_seq OWNED BY public.chi_tiet_phieu_dieu_chinh.id;


--
-- Name: chi_tieu_kpi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chi_tieu_kpi (
    id integer NOT NULL,
    template_id integer NOT NULL,
    ma_chi_tieu text NOT NULL,
    ten_chi_tieu text NOT NULL,
    mo_ta text,
    don_vi_tinh text NOT NULL,
    trong_so numeric(5,2) NOT NULL,
    loai_chi_tieu public.loai_chi_tieu_kpi DEFAULT 'SO'::public.loai_chi_tieu_kpi NOT NULL,
    chi_tieu_toi_thieu numeric(15,2),
    chi_tieu_muc_tieu numeric(15,2),
    chi_tieu_vuot_muc numeric(15,2),
    thu_tu integer DEFAULT 0 NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.chi_tieu_kpi OWNER TO postgres;

--
-- Name: chi_tieu_kpi_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chi_tieu_kpi_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.chi_tieu_kpi_id_seq OWNER TO postgres;

--
-- Name: chi_tieu_kpi_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chi_tieu_kpi_id_seq OWNED BY public.chi_tieu_kpi.id;


--
-- Name: co_cau_luong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.co_cau_luong (
    id integer NOT NULL,
    phong_ban_id integer NOT NULL,
    ten_co_cau text NOT NULL,
    mo_ta text,
    trang_thai boolean DEFAULT true NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.co_cau_luong OWNER TO postgres;

--
-- Name: co_cau_luong_chi_tiet; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.co_cau_luong_chi_tiet (
    id integer NOT NULL,
    co_cau_luong_id integer NOT NULL,
    khoan_luong_id integer NOT NULL,
    bat_buoc boolean DEFAULT false NOT NULL,
    gia_tri_mac_dinh numeric(15,0) DEFAULT 0 NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.co_cau_luong_chi_tiet OWNER TO postgres;

--
-- Name: co_cau_luong_chi_tiet_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.co_cau_luong_chi_tiet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.co_cau_luong_chi_tiet_id_seq OWNER TO postgres;

--
-- Name: co_cau_luong_chi_tiet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.co_cau_luong_chi_tiet_id_seq OWNED BY public.co_cau_luong_chi_tiet.id;


--
-- Name: co_cau_luong_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.co_cau_luong_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.co_cau_luong_id_seq OWNER TO postgres;

--
-- Name: co_cau_luong_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.co_cau_luong_id_seq OWNED BY public.co_cau_luong.id;


--
-- Name: cong_thuc_luong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cong_thuc_luong (
    id integer NOT NULL,
    ma_cong_thuc text NOT NULL,
    ten_cong_thuc text NOT NULL,
    mo_ta text,
    phong_ban_id integer,
    cong_thuc text NOT NULL,
    phien_ban integer DEFAULT 1 NOT NULL,
    tu_ngay timestamp(3) without time zone NOT NULL,
    den_ngay timestamp(3) without time zone,
    trang_thai boolean DEFAULT true NOT NULL,
    nguoi_tao text,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.cong_thuc_luong OWNER TO postgres;

--
-- Name: cong_thuc_luong_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cong_thuc_luong_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cong_thuc_luong_id_seq OWNER TO postgres;

--
-- Name: cong_thuc_luong_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cong_thuc_luong_id_seq OWNED BY public.cong_thuc_luong.id;


--
-- Name: danh_gia_kpi_nhan_vien; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.danh_gia_kpi_nhan_vien (
    id integer NOT NULL,
    ky_danh_gia_id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    template_id integer NOT NULL,
    diem_tong_ket numeric(5,2),
    xep_loai public.xep_loai_kpi,
    he_so_thuong numeric(5,2) DEFAULT 0 NOT NULL,
    so_tien_thuong numeric(15,0) DEFAULT 0 NOT NULL,
    nhan_xet_chung text,
    nguoi_danh_gia text,
    ngay_danh_gia timestamp(3) without time zone,
    nguoi_duyet text,
    ngay_duyet timestamp(3) without time zone,
    trang_thai public.trang_thai_danh_gia_kpi DEFAULT 'NHAP'::public.trang_thai_danh_gia_kpi NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.danh_gia_kpi_nhan_vien OWNER TO postgres;

--
-- Name: danh_gia_kpi_nhan_vien_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.danh_gia_kpi_nhan_vien_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.danh_gia_kpi_nhan_vien_id_seq OWNER TO postgres;

--
-- Name: danh_gia_kpi_nhan_vien_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.danh_gia_kpi_nhan_vien_id_seq OWNED BY public.danh_gia_kpi_nhan_vien.id;


--
-- Name: danh_muc_loai_nghi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.danh_muc_loai_nghi (
    id integer NOT NULL,
    ma_loai_nghi text NOT NULL,
    ten_loai_nghi text NOT NULL,
    nhom_loai text NOT NULL,
    co_tinh_luong boolean DEFAULT true NOT NULL,
    co_tinh_chuyen_can boolean DEFAULT false NOT NULL,
    thu_tu_hien_thi integer DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    tao_boi integer,
    cap_nhat_boi integer,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.danh_muc_loai_nghi OWNER TO postgres;

--
-- Name: danh_muc_loai_nghi_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.danh_muc_loai_nghi_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.danh_muc_loai_nghi_id_seq OWNER TO postgres;

--
-- Name: danh_muc_loai_nghi_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.danh_muc_loai_nghi_id_seq OWNED BY public.danh_muc_loai_nghi.id;


--
-- Name: danh_muc_loai_yeu_cau; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.danh_muc_loai_yeu_cau (
    id integer NOT NULL,
    ma_loai text NOT NULL,
    ten_loai text NOT NULL,
    mo_ta text,
    nhom_loai text NOT NULL,
    yeu_cau_gio_bat_dau boolean DEFAULT false NOT NULL,
    yeu_cau_gio_ket_thuc boolean DEFAULT false NOT NULL,
    yeu_cau_dia_diem boolean DEFAULT false NOT NULL,
    co_tinh_ot boolean DEFAULT false NOT NULL,
    thu_tu_hien_thi integer DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    mau_hien_thi text,
    icon text,
    tao_boi integer,
    cap_nhat_boi integer,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.danh_muc_loai_yeu_cau OWNER TO postgres;

--
-- Name: danh_muc_loai_yeu_cau_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.danh_muc_loai_yeu_cau_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.danh_muc_loai_yeu_cau_id_seq OWNER TO postgres;

--
-- Name: danh_muc_loai_yeu_cau_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.danh_muc_loai_yeu_cau_id_seq OWNED BY public.danh_muc_loai_yeu_cau.id;


--
-- Name: danh_muc_su_kien; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.danh_muc_su_kien (
    id integer NOT NULL,
    ma_su_kien text NOT NULL,
    ten_su_kien text NOT NULL,
    loai public.loai_su_kien NOT NULL,
    mo_ta text,
    so_tien_mac_dinh numeric(15,0),
    trang_thai boolean DEFAULT true NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.danh_muc_su_kien OWNER TO postgres;

--
-- Name: danh_muc_su_kien_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.danh_muc_su_kien_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.danh_muc_su_kien_id_seq OWNER TO postgres;

--
-- Name: danh_muc_su_kien_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.danh_muc_su_kien_id_seq OWNED BY public.danh_muc_su_kien.id;


--
-- Name: don_nghi_phep; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.don_nghi_phep (
    id integer NOT NULL,
    ma_don text NOT NULL,
    nhan_vien_id integer NOT NULL,
    phong_ban_id integer NOT NULL,
    loai_nghi_id integer NOT NULL,
    tu_ngay date NOT NULL,
    den_ngay date NOT NULL,
    so_ngay_nghi numeric(5,2) NOT NULL,
    ly_do text,
    tep_dinh_kem_url text,
    trang_thai public."TrangThaiDonNghiPhep" DEFAULT 'NHAP'::public."TrangThaiDonNghiPhep" NOT NULL,
    nguoi_duyet_id integer,
    ngay_duyet timestamp(3) without time zone,
    ly_do_tu_choi text,
    tao_boi integer,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.don_nghi_phep OWNER TO postgres;

--
-- Name: don_nghi_phep_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.don_nghi_phep_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.don_nghi_phep_id_seq OWNER TO postgres;

--
-- Name: don_nghi_phep_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.don_nghi_phep_id_seq OWNED BY public.don_nghi_phep.id;


--
-- Name: don_vi_con; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.don_vi_con (
    id integer NOT NULL,
    phong_ban_id integer NOT NULL,
    ma_don_vi text NOT NULL,
    ten_don_vi text NOT NULL,
    loai_don_vi text NOT NULL,
    trang_thai text DEFAULT 'HOAT_DONG'::text NOT NULL,
    tao_boi integer,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.don_vi_con OWNER TO postgres;

--
-- Name: don_vi_con_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.don_vi_con_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.don_vi_con_id_seq OWNER TO postgres;

--
-- Name: don_vi_con_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.don_vi_con_id_seq OWNED BY public.don_vi_con.id;


--
-- Name: don_yeu_cau; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.don_yeu_cau (
    id integer NOT NULL,
    ma_don text NOT NULL,
    nhan_vien_id integer NOT NULL,
    phong_ban_id integer NOT NULL,
    loai_yeu_cau_id integer NOT NULL,
    ngay_yeu_cau date NOT NULL,
    gio_bat_dau text,
    gio_ket_thuc text,
    so_gio numeric(5,2),
    dia_diem text,
    ly_do text NOT NULL,
    tep_dinh_kem_url text,
    trang_thai public.trang_thai_don_yeu_cau DEFAULT 'NHAP'::public.trang_thai_don_yeu_cau NOT NULL,
    nguoi_duyet_1_id integer,
    ngay_duyet_1 timestamp(3) without time zone,
    ghi_chu_duyet_1 text,
    nguoi_duyet_2_id integer,
    ngay_duyet_2 timestamp(3) without time zone,
    ghi_chu_duyet_2 text,
    ly_do_tu_choi text,
    is_override boolean DEFAULT false NOT NULL,
    ly_do_override text,
    nguoi_override_id integer,
    tao_boi integer,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.don_yeu_cau OWNER TO postgres;

--
-- Name: don_yeu_cau_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.don_yeu_cau_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.don_yeu_cau_id_seq OWNER TO postgres;

--
-- Name: don_yeu_cau_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.don_yeu_cau_id_seq OWNED BY public.don_yeu_cau.id;


--
-- Name: giao_hang; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.giao_hang (
    id integer NOT NULL,
    ngay date NOT NULL,
    nhan_vien_id integer NOT NULL,
    khoi_luong_thanh_cong numeric(15,2) DEFAULT 0 NOT NULL,
    so_lan_tre_gio integer DEFAULT 0 NOT NULL,
    so_lan_khong_lay_phieu integer DEFAULT 0 NOT NULL,
    ghi_chu text,
    nguon_du_lieu public.nguon_du_lieu DEFAULT 'IMPORT_EXCEL'::public.nguon_du_lieu NOT NULL,
    import_id integer,
    khoa_sua boolean DEFAULT true NOT NULL,
    tao_boi integer,
    tao_luc timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    cap_nhat_boi integer,
    cap_nhat_luc timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.giao_hang OWNER TO postgres;

--
-- Name: giao_hang_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.giao_hang_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.giao_hang_id_seq OWNER TO postgres;

--
-- Name: giao_hang_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.giao_hang_id_seq OWNED BY public.giao_hang.id;


--
-- Name: ket_qua_kpi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ket_qua_kpi (
    id integer NOT NULL,
    danh_gia_id integer NOT NULL,
    chi_tieu_id integer NOT NULL,
    ket_qua_dat numeric(15,2),
    ty_le_dat numeric(5,2),
    diem_quy_doi numeric(5,2),
    ghi_chu text,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.ket_qua_kpi OWNER TO postgres;

--
-- Name: ket_qua_kpi_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ket_qua_kpi_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ket_qua_kpi_id_seq OWNER TO postgres;

--
-- Name: ket_qua_kpi_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ket_qua_kpi_id_seq OWNED BY public.ket_qua_kpi.id;


--
-- Name: khoan_luong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.khoan_luong (
    id integer NOT NULL,
    ma_khoan text NOT NULL,
    ten_khoan text NOT NULL,
    loai public.loai_khoan_luong DEFAULT 'THU_NHAP'::public.loai_khoan_luong NOT NULL,
    cach_tinh public.cach_tinh_luong DEFAULT 'LUONG_THANG_CO_DINH'::public.cach_tinh_luong NOT NULL,
    chiu_thue boolean DEFAULT false NOT NULL,
    pham_vi_ap_dung text,
    mo_ta text,
    thu_tu integer DEFAULT 0 NOT NULL,
    trang_thai boolean DEFAULT true NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.khoan_luong OWNER TO postgres;

--
-- Name: khoan_luong_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.khoan_luong_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.khoan_luong_id_seq OWNER TO postgres;

--
-- Name: khoan_luong_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.khoan_luong_id_seq OWNED BY public.khoan_luong.id;


--
-- Name: ky_danh_gia_kpi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ky_danh_gia_kpi (
    id integer NOT NULL,
    ma_ky text NOT NULL,
    ten_ky text NOT NULL,
    loai_ky public.loai_ky_danh_gia DEFAULT 'THANG'::public.loai_ky_danh_gia NOT NULL,
    thang integer,
    quy integer,
    nam integer NOT NULL,
    tu_ngay timestamp(3) without time zone NOT NULL,
    den_ngay timestamp(3) without time zone NOT NULL,
    han_nop_ket_qua timestamp(3) without time zone NOT NULL,
    trang_thai public.trang_thai_ky_danh_gia DEFAULT 'MO'::public.trang_thai_ky_danh_gia NOT NULL,
    ghi_chu text,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.ky_danh_gia_kpi OWNER TO postgres;

--
-- Name: ky_danh_gia_kpi_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ky_danh_gia_kpi_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ky_danh_gia_kpi_id_seq OWNER TO postgres;

--
-- Name: ky_danh_gia_kpi_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ky_danh_gia_kpi_id_seq OWNED BY public.ky_danh_gia_kpi.id;


--
-- Name: lich_phan_ca; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lich_phan_ca (
    id integer NOT NULL,
    thang_nam text NOT NULL,
    phong_ban_id integer,
    nhom_id integer,
    ten_lich text,
    ghi_chu text,
    trang_thai public.trang_thai_lich_ca DEFAULT 'NHAP'::public.trang_thai_lich_ca NOT NULL,
    ngay_cong_bo timestamp(3) without time zone,
    nguoi_cong_bo integer,
    tao_boi integer,
    cap_nhat_boi integer,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.lich_phan_ca OWNER TO postgres;

--
-- Name: lich_phan_ca_chi_tiet; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lich_phan_ca_chi_tiet (
    id integer NOT NULL,
    lich_phan_ca_id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    ngay date NOT NULL,
    ca_lam_viec_id integer NOT NULL,
    ghi_chu text,
    tao_boi integer,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.lich_phan_ca_chi_tiet OWNER TO postgres;

--
-- Name: lich_phan_ca_chi_tiet_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lich_phan_ca_chi_tiet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lich_phan_ca_chi_tiet_id_seq OWNER TO postgres;

--
-- Name: lich_phan_ca_chi_tiet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lich_phan_ca_chi_tiet_id_seq OWNED BY public.lich_phan_ca_chi_tiet.id;


--
-- Name: lich_phan_ca_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lich_phan_ca_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lich_phan_ca_id_seq OWNER TO postgres;

--
-- Name: lich_phan_ca_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lich_phan_ca_id_seq OWNED BY public.lich_phan_ca.id;


--
-- Name: lich_su_chinh_sua; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lich_su_chinh_sua (
    id integer NOT NULL,
    bang_luong_id integer,
    nhan_vien_id integer,
    khoan_luong_id integer,
    gia_tri_cu numeric(15,0),
    gia_tri_moi numeric(15,0),
    loai_thay_doi text NOT NULL,
    nguoi_thay_doi text NOT NULL,
    ly_do text,
    ngay_thay_doi timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.lich_su_chinh_sua OWNER TO postgres;

--
-- Name: lich_su_chinh_sua_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lich_su_chinh_sua_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lich_su_chinh_sua_id_seq OWNER TO postgres;

--
-- Name: lich_su_chinh_sua_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lich_su_chinh_sua_id_seq OWNED BY public.lich_su_chinh_sua.id;


--
-- Name: lich_su_cong_thuc; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lich_su_cong_thuc (
    id integer NOT NULL,
    ma_cong_thuc text NOT NULL,
    phien_ban integer NOT NULL,
    cong_thuc_cu text NOT NULL,
    cong_thuc_moi text NOT NULL,
    ly_do_thay_doi text,
    nguoi_thay_doi text NOT NULL,
    ngay_thay_doi timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.lich_su_cong_thuc OWNER TO postgres;

--
-- Name: lich_su_cong_thuc_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lich_su_cong_thuc_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lich_su_cong_thuc_id_seq OWNER TO postgres;

--
-- Name: lich_su_cong_thuc_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lich_su_cong_thuc_id_seq OWNED BY public.lich_su_cong_thuc.id;


--
-- Name: lich_su_import; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lich_su_import (
    id integer NOT NULL,
    loai_import public.loai_import NOT NULL,
    ngay_du_lieu date NOT NULL,
    ten_file text NOT NULL,
    file_hash text,
    so_dong integer NOT NULL,
    so_dong_hop_le integer NOT NULL,
    so_dong_loi integer NOT NULL,
    trang_thai public.trang_thai_import NOT NULL,
    nguoi_import_id integer NOT NULL,
    import_luc timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    noi_dung_loi_json text
);


ALTER TABLE public.lich_su_import OWNER TO postgres;

--
-- Name: lich_su_import_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lich_su_import_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lich_su_import_id_seq OWNER TO postgres;

--
-- Name: lich_su_import_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lich_su_import_id_seq OWNED BY public.lich_su_import.id;


--
-- Name: lich_su_sua_cong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lich_su_sua_cong (
    id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    ngay_cham_cong timestamp(3) without time zone NOT NULL,
    truong_thay_doi text NOT NULL,
    gia_tri_cu text,
    gia_tri_moi text,
    nguon_thay_doi text NOT NULL,
    yeu_cau_sua_cong_id integer,
    nguoi_thuc_hien_id integer NOT NULL,
    ghi_chu text,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.lich_su_sua_cong OWNER TO postgres;

--
-- Name: lich_su_sua_cong_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lich_su_sua_cong_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lich_su_sua_cong_id_seq OWNER TO postgres;

--
-- Name: lich_su_sua_cong_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lich_su_sua_cong_id_seq OWNED BY public.lich_su_sua_cong.id;


--
-- Name: lich_su_thiet_bi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lich_su_thiet_bi (
    id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    hanh_dong text NOT NULL,
    device_id_cu character varying(255),
    device_id_moi character varying(255),
    nguoi_thuc_hien_id integer,
    ly_do text,
    ip_address character varying(50),
    user_agent character varying(500),
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.lich_su_thiet_bi OWNER TO postgres;

--
-- Name: lich_su_thiet_bi_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lich_su_thiet_bi_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lich_su_thiet_bi_id_seq OWNER TO postgres;

--
-- Name: lich_su_thiet_bi_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lich_su_thiet_bi_id_seq OWNED BY public.lich_su_thiet_bi.id;


--
-- Name: mapping_excel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mapping_excel (
    id integer NOT NULL,
    ten_mapping text NOT NULL,
    ten_cot_excel text NOT NULL,
    khoan_luong_id integer,
    truong_he_thong text,
    thu_tu_cot integer DEFAULT 0 NOT NULL,
    trang_thai boolean DEFAULT true NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.mapping_excel OWNER TO postgres;

--
-- Name: mapping_excel_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mapping_excel_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mapping_excel_id_seq OWNER TO postgres;

--
-- Name: mapping_excel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mapping_excel_id_seq OWNED BY public.mapping_excel.id;


--
-- Name: ngay_cong_bang_luong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ngay_cong_bang_luong (
    id integer NOT NULL,
    bang_luong_id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    ngay_cong_ly_thuyet numeric(5,2) NOT NULL,
    so_cong_thuc_te numeric(5,2) NOT NULL,
    so_ngay_nghi_phep numeric(5,2) DEFAULT 0 NOT NULL,
    so_ngay_nghi_khong_phep numeric(5,2) DEFAULT 0 NOT NULL,
    so_ngay_nghi_co_phep numeric(5,2) DEFAULT 0 NOT NULL,
    so_ngay_nghi_co_luong numeric(5,2) DEFAULT 0 NOT NULL,
    so_ngay_nghi_khong_luong numeric(5,2) DEFAULT 0 NOT NULL,
    ngay_cong_dieu_chinh numeric(5,2),
    ghi_chu text,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.ngay_cong_bang_luong OWNER TO postgres;

--
-- Name: ngay_cong_bang_luong_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ngay_cong_bang_luong_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ngay_cong_bang_luong_id_seq OWNER TO postgres;

--
-- Name: ngay_cong_bang_luong_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ngay_cong_bang_luong_id_seq OWNED BY public.ngay_cong_bang_luong.id;


--
-- Name: nguoi_dung; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nguoi_dung (
    id integer NOT NULL,
    ten_dang_nhap text NOT NULL,
    mat_khau text NOT NULL,
    email text NOT NULL,
    ho_ten text NOT NULL,
    nhan_vien_id integer,
    trang_thai public.trang_thai_nguoi_dung DEFAULT 'HOAT_DONG'::public.trang_thai_nguoi_dung NOT NULL,
    lan_dang_nhap_cuoi timestamp(3) without time zone,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.nguoi_dung OWNER TO postgres;

--
-- Name: nguoi_dung_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nguoi_dung_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nguoi_dung_id_seq OWNER TO postgres;

--
-- Name: nguoi_dung_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nguoi_dung_id_seq OWNED BY public.nguoi_dung.id;


--
-- Name: nguoi_dung_vai_tro; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nguoi_dung_vai_tro (
    id integer NOT NULL,
    nguoi_dung_id integer NOT NULL,
    vai_tro_id integer NOT NULL,
    phong_ban_id integer,
    tu_ngay timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    den_ngay timestamp(3) without time zone,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.nguoi_dung_vai_tro OWNER TO postgres;

--
-- Name: nguoi_dung_vai_tro_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nguoi_dung_vai_tro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nguoi_dung_vai_tro_id_seq OWNER TO postgres;

--
-- Name: nguoi_dung_vai_tro_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nguoi_dung_vai_tro_id_seq OWNED BY public.nguoi_dung_vai_tro.id;


--
-- Name: nguoi_phu_thuoc; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nguoi_phu_thuoc (
    id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    ho_ten text NOT NULL,
    ngay_sinh timestamp(3) without time zone,
    quan_he text NOT NULL,
    ma_so_thue text,
    so_cccd text,
    tu_ngay timestamp(3) without time zone NOT NULL,
    den_ngay timestamp(3) without time zone,
    trang_thai boolean DEFAULT true NOT NULL,
    ghi_chu text,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.nguoi_phu_thuoc OWNER TO postgres;

--
-- Name: nguoi_phu_thuoc_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nguoi_phu_thuoc_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nguoi_phu_thuoc_id_seq OWNER TO postgres;

--
-- Name: nguoi_phu_thuoc_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nguoi_phu_thuoc_id_seq OWNED BY public.nguoi_phu_thuoc.id;


--
-- Name: nhan_vien; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nhan_vien (
    id integer NOT NULL,
    ma_nhan_vien text NOT NULL,
    ho_ten text NOT NULL,
    email text,
    so_dien_thoai text,
    phong_ban_id integer NOT NULL,
    chuc_vu text,
    loai_nhan_vien public.loai_nhan_vien DEFAULT 'CHINH_THUC'::public.loai_nhan_vien NOT NULL,
    dong_bhxh boolean DEFAULT true NOT NULL,
    luong_co_ban numeric(15,0) DEFAULT 0 NOT NULL,
    ngay_vao_lam timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_nghi_viec timestamp(3) without time zone,
    gioi_tinh public.gioi_tinh,
    ngay_sinh date,
    dia_chi text,
    so_cccd text,
    hinh_cccd_truoc text,
    hinh_cccd_sau text,
    so_dien_thoai_khan_cap text,
    nguoi_lien_he_khan_cap text,
    quan_he_khan_cap text,
    trang_thai public.trang_thai_nhan_vien DEFAULT 'DANG_LAM'::public.trang_thai_nhan_vien NOT NULL,
    tao_boi integer,
    cap_nhat_boi integer,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.nhan_vien OWNER TO postgres;

--
-- Name: nhan_vien_hop_dong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nhan_vien_hop_dong (
    id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    loai_hop_dong public.loai_hop_dong NOT NULL,
    tu_ngay date NOT NULL,
    den_ngay date,
    luong_co_ban numeric(15,0) NOT NULL,
    luong_dong_bh numeric(15,0),
    he_so_luong numeric(5,2),
    loai_nhan_vien public.loai_nhan_vien DEFAULT 'CHINH_THUC'::public.loai_nhan_vien NOT NULL,
    trang_thai public.trang_thai_hop_dong DEFAULT 'HIEU_LUC'::public.trang_thai_hop_dong NOT NULL,
    ghi_chu text,
    file_hop_dong text,
    files_hop_dong text[],
    tao_boi integer,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.nhan_vien_hop_dong OWNER TO postgres;

--
-- Name: nhan_vien_hop_dong_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nhan_vien_hop_dong_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nhan_vien_hop_dong_id_seq OWNER TO postgres;

--
-- Name: nhan_vien_hop_dong_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nhan_vien_hop_dong_id_seq OWNED BY public.nhan_vien_hop_dong.id;


--
-- Name: nhan_vien_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nhan_vien_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nhan_vien_id_seq OWNER TO postgres;

--
-- Name: nhan_vien_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nhan_vien_id_seq OWNED BY public.nhan_vien.id;


--
-- Name: nhan_vien_ngan_hang; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nhan_vien_ngan_hang (
    id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    ten_ngan_hang text NOT NULL,
    so_tai_khoan text NOT NULL,
    chu_tai_khoan text NOT NULL,
    chi_nhanh text,
    la_mac_dinh boolean DEFAULT true NOT NULL,
    tu_ngay date,
    den_ngay date,
    ghi_chu text,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.nhan_vien_ngan_hang OWNER TO postgres;

--
-- Name: nhan_vien_ngan_hang_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nhan_vien_ngan_hang_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nhan_vien_ngan_hang_id_seq OWNER TO postgres;

--
-- Name: nhan_vien_ngan_hang_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nhan_vien_ngan_hang_id_seq OWNED BY public.nhan_vien_ngan_hang.id;


--
-- Name: nhan_vien_phong_ban; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nhan_vien_phong_ban (
    id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    phong_ban_id integer NOT NULL,
    don_vi_con_id integer,
    tu_ngay date NOT NULL,
    den_ngay date,
    ghi_chu text,
    tao_boi integer,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.nhan_vien_phong_ban OWNER TO postgres;

--
-- Name: nhan_vien_phong_ban_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nhan_vien_phong_ban_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nhan_vien_phong_ban_id_seq OWNER TO postgres;

--
-- Name: nhan_vien_phong_ban_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nhan_vien_phong_ban_id_seq OWNED BY public.nhan_vien_phong_ban.id;


--
-- Name: nhan_vien_thue_bh; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nhan_vien_thue_bh (
    id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    mst_ca_nhan text,
    so_cmnd_cccd text,
    ngay_cap date,
    noi_cap text,
    so_nguoi_phu_thuoc integer DEFAULT 0 NOT NULL,
    ghi_chu text,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.nhan_vien_thue_bh OWNER TO postgres;

--
-- Name: nhan_vien_thue_bh_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nhan_vien_thue_bh_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nhan_vien_thue_bh_id_seq OWNER TO postgres;

--
-- Name: nhan_vien_thue_bh_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nhan_vien_thue_bh_id_seq OWNED BY public.nhan_vien_thue_bh.id;


--
-- Name: nhan_vien_thuoc_nhom; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nhan_vien_thuoc_nhom (
    id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    nhom_id integer NOT NULL,
    tu_ngay date,
    den_ngay date,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.nhan_vien_thuoc_nhom OWNER TO postgres;

--
-- Name: nhan_vien_thuoc_nhom_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nhan_vien_thuoc_nhom_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nhan_vien_thuoc_nhom_id_seq OWNER TO postgres;

--
-- Name: nhan_vien_thuoc_nhom_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nhan_vien_thuoc_nhom_id_seq OWNED BY public.nhan_vien_thuoc_nhom.id;


--
-- Name: nhan_vien_trach_nhiem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nhan_vien_trach_nhiem (
    id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    phong_ban_id integer NOT NULL,
    cap_trach_nhiem integer DEFAULT 1 NOT NULL,
    he_so_trach_nhiem numeric(5,2) DEFAULT 1 NOT NULL,
    vai_tro text,
    tu_ngay timestamp(3) without time zone NOT NULL,
    den_ngay timestamp(3) without time zone,
    ghi_chu text,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.nhan_vien_trach_nhiem OWNER TO postgres;

--
-- Name: nhan_vien_trach_nhiem_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nhan_vien_trach_nhiem_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nhan_vien_trach_nhiem_id_seq OWNER TO postgres;

--
-- Name: nhan_vien_trach_nhiem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nhan_vien_trach_nhiem_id_seq OWNED BY public.nhan_vien_trach_nhiem.id;


--
-- Name: nhom_nhan_vien; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.nhom_nhan_vien (
    id integer NOT NULL,
    ma_nhom text NOT NULL,
    ten_nhom text NOT NULL,
    mo_ta text,
    mau_sac text,
    trang_thai boolean DEFAULT true NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.nhom_nhan_vien OWNER TO postgres;

--
-- Name: nhom_nhan_vien_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.nhom_nhan_vien_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nhom_nhan_vien_id_seq OWNER TO postgres;

--
-- Name: nhom_nhan_vien_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.nhom_nhan_vien_id_seq OWNED BY public.nhom_nhan_vien.id;


--
-- Name: phan_quyen_phong_ban; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.phan_quyen_phong_ban (
    id integer NOT NULL,
    nguoi_dung_id integer NOT NULL,
    phong_ban_id integer NOT NULL,
    quyen text NOT NULL,
    tao_boi integer,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.phan_quyen_phong_ban OWNER TO postgres;

--
-- Name: phan_quyen_phong_ban_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.phan_quyen_phong_ban_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.phan_quyen_phong_ban_id_seq OWNER TO postgres;

--
-- Name: phan_quyen_phong_ban_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.phan_quyen_phong_ban_id_seq OWNED BY public.phan_quyen_phong_ban.id;


--
-- Name: phien_dang_nhap; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.phien_dang_nhap (
    id integer NOT NULL,
    nguoi_dung_id integer NOT NULL,
    token text NOT NULL,
    dia_chi_ip text,
    user_agent text,
    thoi_gian_bat_dau timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    thoi_gian_het_han timestamp(3) without time zone NOT NULL,
    trang_thai public.trang_thai_phien DEFAULT 'HOAT_DONG'::public.trang_thai_phien NOT NULL
);


ALTER TABLE public.phien_dang_nhap OWNER TO postgres;

--
-- Name: phien_dang_nhap_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.phien_dang_nhap_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.phien_dang_nhap_id_seq OWNER TO postgres;

--
-- Name: phien_dang_nhap_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.phien_dang_nhap_id_seq OWNED BY public.phien_dang_nhap.id;


--
-- Name: phieu_dieu_chinh; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.phieu_dieu_chinh (
    id integer NOT NULL,
    ma_phieu text NOT NULL,
    bang_luong_id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    loai_dieu_chinh public.loai_dieu_chinh DEFAULT 'TANG'::public.loai_dieu_chinh NOT NULL,
    ly_do text NOT NULL,
    ghi_chu text,
    trang_thai public.trang_thai_phieu_dc DEFAULT 'CHO_DUYET'::public.trang_thai_phieu_dc NOT NULL,
    nguoi_tao text NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    nguoi_duyet text,
    ngay_duyet timestamp(3) without time zone,
    nguoi_tu_choi text,
    ngay_tu_choi timestamp(3) without time zone,
    ly_do_tu_choi text
);


ALTER TABLE public.phieu_dieu_chinh OWNER TO postgres;

--
-- Name: phieu_dieu_chinh_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.phieu_dieu_chinh_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.phieu_dieu_chinh_id_seq OWNER TO postgres;

--
-- Name: phieu_dieu_chinh_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.phieu_dieu_chinh_id_seq OWNED BY public.phieu_dieu_chinh.id;


--
-- Name: phong_ban; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.phong_ban (
    id integer NOT NULL,
    ma_phong_ban text NOT NULL,
    ten_phong_ban text NOT NULL,
    mo_ta text,
    trang_thai text DEFAULT 'HOAT_DONG'::text NOT NULL,
    phong_ban_cha_id integer,
    cap_do integer DEFAULT 1 NOT NULL,
    loai_phong_ban text,
    nguoi_quan_ly_id integer,
    gio_vao_chuan text DEFAULT '08:00'::text NOT NULL,
    gio_ra_chuan text DEFAULT '17:00'::text NOT NULL,
    phut_cho_phep_tre integer DEFAULT 5 NOT NULL,
    quy_tac_ngay_cong text DEFAULT 'SAT_HALF_SUN_OFF'::text,
    so_ngay_cong_thang integer,
    tao_boi integer,
    cap_nhat_boi integer,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.phong_ban OWNER TO postgres;

--
-- Name: phong_ban_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.phong_ban_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.phong_ban_id_seq OWNER TO postgres;

--
-- Name: phong_ban_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.phong_ban_id_seq OWNED BY public.phong_ban.id;


--
-- Name: phu_cap_nhan_vien; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.phu_cap_nhan_vien (
    id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    khoan_luong_id integer NOT NULL,
    so_tien numeric(15,0) DEFAULT 0 NOT NULL,
    tu_ngay timestamp(3) without time zone NOT NULL,
    den_ngay timestamp(3) without time zone,
    ghi_chu text,
    trang_thai public.trang_thai_phu_cap DEFAULT 'HIEU_LUC'::public.trang_thai_phu_cap NOT NULL,
    nguoi_tao text,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.phu_cap_nhan_vien OWNER TO postgres;

--
-- Name: phu_cap_nhan_vien_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.phu_cap_nhan_vien_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.phu_cap_nhan_vien_id_seq OWNER TO postgres;

--
-- Name: phu_cap_nhan_vien_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.phu_cap_nhan_vien_id_seq OWNED BY public.phu_cap_nhan_vien.id;


--
-- Name: quy_che; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quy_che (
    id integer NOT NULL,
    phong_ban_id integer NOT NULL,
    ten_quy_che text NOT NULL,
    mo_ta text,
    tu_ngay timestamp(3) without time zone NOT NULL,
    den_ngay timestamp(3) without time zone,
    phien_ban integer DEFAULT 1 NOT NULL,
    trang_thai public.trang_thai_quy_che DEFAULT 'HIEU_LUC'::public.trang_thai_quy_che NOT NULL,
    nguoi_tao text,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.quy_che OWNER TO postgres;

--
-- Name: quy_che_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quy_che_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.quy_che_id_seq OWNER TO postgres;

--
-- Name: quy_che_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quy_che_id_seq OWNED BY public.quy_che.id;


--
-- Name: quy_che_rule; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quy_che_rule (
    id integer NOT NULL,
    quy_che_id integer NOT NULL,
    khoan_luong_id integer NOT NULL,
    ten_rule text NOT NULL,
    mo_ta text,
    loai_rule public.loai_rule NOT NULL,
    dieu_kien_json text,
    cong_thuc_json text NOT NULL,
    thu_tu_uu_tien integer DEFAULT 0 NOT NULL,
    che_do_gop public.che_do_gop DEFAULT 'GHI_DE'::public.che_do_gop NOT NULL,
    cho_phep_chinh_tay boolean DEFAULT true NOT NULL,
    trang_thai boolean DEFAULT true NOT NULL,
    nguoi_tao text,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.quy_che_rule OWNER TO postgres;

--
-- Name: quy_che_rule_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quy_che_rule_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.quy_che_rule_id_seq OWNER TO postgres;

--
-- Name: quy_che_rule_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quy_che_rule_id_seq OWNED BY public.quy_che_rule.id;


--
-- Name: quyen; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.quyen (
    id integer NOT NULL,
    ma_quyen text NOT NULL,
    ten_quyen text NOT NULL,
    nhom_quyen text NOT NULL,
    mo_ta text,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.quyen OWNER TO postgres;

--
-- Name: quyen_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.quyen_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.quyen_id_seq OWNER TO postgres;

--
-- Name: quyen_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.quyen_id_seq OWNED BY public.quyen.id;


--
-- Name: request_mapping_cham_cong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.request_mapping_cham_cong (
    id integer NOT NULL,
    don_yeu_cau_id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    ngay date NOT NULL,
    loai_mapping text NOT NULL,
    so_gio_ap_dung numeric(5,2),
    ghi_chu text,
    da_ap_dung boolean DEFAULT false NOT NULL,
    ngay_ap_dung timestamp(3) without time zone,
    ky_luong_id integer,
    is_locked boolean DEFAULT false NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.request_mapping_cham_cong OWNER TO postgres;

--
-- Name: request_mapping_cham_cong_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.request_mapping_cham_cong_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.request_mapping_cham_cong_id_seq OWNER TO postgres;

--
-- Name: request_mapping_cham_cong_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.request_mapping_cham_cong_id_seq OWNED BY public.request_mapping_cham_cong.id;


--
-- Name: request_workflow_config; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.request_workflow_config (
    id integer NOT NULL,
    loai_yeu_cau_id integer NOT NULL,
    phong_ban_id integer,
    so_cap integer DEFAULT 1 NOT NULL,
    nguoi_duyet_1 text NOT NULL,
    nguoi_duyet_cu_the_1_id integer,
    nguoi_duyet_2 text,
    nguoi_duyet_cu_the_2_id integer,
    tu_dong_duyet_neu_qua_han boolean DEFAULT false NOT NULL,
    so_ngay_qua_han integer,
    yeu_cau_ly_do_tu_choi boolean DEFAULT true NOT NULL,
    yeu_cau_ly_do_override boolean DEFAULT true NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    tao_boi integer,
    cap_nhat_boi integer,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.request_workflow_config OWNER TO postgres;

--
-- Name: request_workflow_config_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.request_workflow_config_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.request_workflow_config_id_seq OWNER TO postgres;

--
-- Name: request_workflow_config_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.request_workflow_config_id_seq OWNED BY public.request_workflow_config.id;


--
-- Name: rule_trace; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rule_trace (
    id integer NOT NULL,
    bang_luong_id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    quy_che_id integer NOT NULL,
    quy_che_rule_id integer,
    khoan_luong_id integer NOT NULL,
    input_json text NOT NULL,
    output_so_tien numeric(15,0) NOT NULL,
    message_giai_thich text NOT NULL,
    tao_luc timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.rule_trace OWNER TO postgres;

--
-- Name: rule_trace_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rule_trace_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rule_trace_id_seq OWNER TO postgres;

--
-- Name: rule_trace_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rule_trace_id_seq OWNED BY public.rule_trace.id;


--
-- Name: san_luong_chia_hang; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.san_luong_chia_hang (
    id integer NOT NULL,
    ngay date NOT NULL,
    nhan_vien_id integer NOT NULL,
    so_luong_sp_dat integer DEFAULT 0 NOT NULL,
    so_luong_sp_loi integer DEFAULT 0 NOT NULL,
    ghi_chu text,
    nguon_du_lieu public.nguon_du_lieu DEFAULT 'IMPORT_EXCEL'::public.nguon_du_lieu NOT NULL,
    import_id integer,
    khoa_sua boolean DEFAULT true NOT NULL,
    tao_boi integer,
    tao_luc timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    cap_nhat_boi integer,
    cap_nhat_luc timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.san_luong_chia_hang OWNER TO postgres;

--
-- Name: san_luong_chia_hang_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.san_luong_chia_hang_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.san_luong_chia_hang_id_seq OWNER TO postgres;

--
-- Name: san_luong_chia_hang_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.san_luong_chia_hang_id_seq OWNED BY public.san_luong_chia_hang.id;


--
-- Name: snapshot_bang_luong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.snapshot_bang_luong (
    id integer NOT NULL,
    bang_luong_id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    ma_nhan_vien text NOT NULL,
    ho_ten text NOT NULL,
    phong_ban text NOT NULL,
    phong_ban_id integer,
    don_vi_con_id integer,
    don_vi_con text,
    khoan_luong_id integer NOT NULL,
    ma_khoan text NOT NULL,
    ten_khoan text NOT NULL,
    loai_khoan public.loai_khoan_luong NOT NULL,
    so_tien numeric(15,0) NOT NULL,
    nguon public.nguon_chi_tiet NOT NULL,
    ngay_chot timestamp(3) without time zone NOT NULL,
    nguoi_chot text NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.snapshot_bang_luong OWNER TO postgres;

--
-- Name: snapshot_bang_luong_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.snapshot_bang_luong_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.snapshot_bang_luong_id_seq OWNER TO postgres;

--
-- Name: snapshot_bang_luong_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.snapshot_bang_luong_id_seq OWNED BY public.snapshot_bang_luong.id;


--
-- Name: snapshot_bang_ung_luong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.snapshot_bang_ung_luong (
    id integer NOT NULL,
    bang_ung_luong_id integer NOT NULL,
    ma_bang_ung_luong text NOT NULL,
    thang_nam text NOT NULL,
    tu_ngay date NOT NULL,
    den_ngay date NOT NULL,
    cau_hinh_json text,
    tong_so_tien_ung numeric(15,0) NOT NULL,
    so_nhan_vien_ung integer NOT NULL,
    ngay_chot timestamp(3) without time zone NOT NULL,
    nguoi_chot text NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.snapshot_bang_ung_luong OWNER TO postgres;

--
-- Name: snapshot_bang_ung_luong_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.snapshot_bang_ung_luong_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.snapshot_bang_ung_luong_id_seq OWNER TO postgres;

--
-- Name: snapshot_bang_ung_luong_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.snapshot_bang_ung_luong_id_seq OWNED BY public.snapshot_bang_ung_luong.id;


--
-- Name: snapshot_chi_tiet_bang_ung_luong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.snapshot_chi_tiet_bang_ung_luong (
    id integer NOT NULL,
    snapshot_id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    ma_nhan_vien text NOT NULL,
    ho_ten text NOT NULL,
    phong_ban text NOT NULL,
    nhom_nhan_vien text,
    tien_cong_luy_ke numeric(15,0) NOT NULL,
    muc_toi_da_duoc_ung numeric(15,0) NOT NULL,
    so_ngay_cong numeric(5,2) NOT NULL,
    so_ngay_nghi numeric(5,2) NOT NULL,
    so_ngay_nghi_khong_phep numeric(5,2) NOT NULL,
    duoc_phep_ung boolean NOT NULL,
    ly_do_khong_dat text,
    so_tien_ung_de_xuat numeric(15,0) NOT NULL,
    so_tien_ung_duyet numeric(15,0) NOT NULL,
    ghi_chu text,
    input_data_json text,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.snapshot_chi_tiet_bang_ung_luong OWNER TO postgres;

--
-- Name: snapshot_chi_tiet_bang_ung_luong_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.snapshot_chi_tiet_bang_ung_luong_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.snapshot_chi_tiet_bang_ung_luong_id_seq OWNER TO postgres;

--
-- Name: snapshot_chi_tiet_bang_ung_luong_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.snapshot_chi_tiet_bang_ung_luong_id_seq OWNED BY public.snapshot_chi_tiet_bang_ung_luong.id;


--
-- Name: snapshot_giao_hang; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.snapshot_giao_hang (
    id integer NOT NULL,
    bang_luong_id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    tong_khoi_luong_thanh_cong numeric(15,2) DEFAULT 0 NOT NULL,
    tong_so_lan_tre_gio integer DEFAULT 0 NOT NULL,
    tong_so_lan_khong_lay_phieu integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.snapshot_giao_hang OWNER TO postgres;

--
-- Name: snapshot_giao_hang_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.snapshot_giao_hang_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.snapshot_giao_hang_id_seq OWNER TO postgres;

--
-- Name: snapshot_giao_hang_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.snapshot_giao_hang_id_seq OWNED BY public.snapshot_giao_hang.id;


--
-- Name: snapshot_san_luong_chia_hang; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.snapshot_san_luong_chia_hang (
    id integer NOT NULL,
    bang_luong_id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    tong_sp_dat integer DEFAULT 0 NOT NULL,
    tong_sp_loi integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.snapshot_san_luong_chia_hang OWNER TO postgres;

--
-- Name: snapshot_san_luong_chia_hang_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.snapshot_san_luong_chia_hang_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.snapshot_san_luong_chia_hang_id_seq OWNER TO postgres;

--
-- Name: snapshot_san_luong_chia_hang_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.snapshot_san_luong_chia_hang_id_seq OWNED BY public.snapshot_san_luong_chia_hang.id;


--
-- Name: su_kien_thuong_phat; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.su_kien_thuong_phat (
    id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    phong_ban_id integer NOT NULL,
    ngay timestamp(3) without time zone NOT NULL,
    loai_su_kien public.loai_su_kien NOT NULL,
    ma_su_kien text NOT NULL,
    gia_tri numeric(15,2) DEFAULT 0 NOT NULL,
    so_tien numeric(15,0) DEFAULT 0 NOT NULL,
    ghi_chu text,
    trang_thai public.trang_thai_su_kien DEFAULT 'NHAP'::public.trang_thai_su_kien NOT NULL,
    duyet_boi text,
    duyet_luc timestamp(3) without time zone,
    nguoi_tao text,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.su_kien_thuong_phat OWNER TO postgres;

--
-- Name: su_kien_thuong_phat_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.su_kien_thuong_phat_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.su_kien_thuong_phat_id_seq OWNER TO postgres;

--
-- Name: su_kien_thuong_phat_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.su_kien_thuong_phat_id_seq OWNED BY public.su_kien_thuong_phat.id;


--
-- Name: template_kpi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.template_kpi (
    id integer NOT NULL,
    ma_template text NOT NULL,
    ten_template text NOT NULL,
    phong_ban_id integer,
    mo_ta text,
    trang_thai boolean DEFAULT true NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.template_kpi OWNER TO postgres;

--
-- Name: template_kpi_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.template_kpi_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.template_kpi_id_seq OWNER TO postgres;

--
-- Name: template_kpi_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.template_kpi_id_seq OWNED BY public.template_kpi.id;


--
-- Name: thiet_bi_nhan_vien; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.thiet_bi_nhan_vien (
    id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    device_id character varying(255) NOT NULL,
    ten_thiet_bi character varying(255),
    user_agent character varying(500),
    platform character varying(50),
    ip_address character varying(50),
    trang_thai text DEFAULT 'ACTIVE'::text NOT NULL,
    ngay_dang_ky timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    lan_dang_nhap_cuoi timestamp(3) without time zone,
    nguoi_reset_id integer,
    ly_do_reset text,
    ngay_reset timestamp(3) without time zone,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.thiet_bi_nhan_vien OWNER TO postgres;

--
-- Name: thiet_bi_nhan_vien_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.thiet_bi_nhan_vien_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.thiet_bi_nhan_vien_id_seq OWNER TO postgres;

--
-- Name: thiet_bi_nhan_vien_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.thiet_bi_nhan_vien_id_seq OWNED BY public.thiet_bi_nhan_vien.id;


--
-- Name: thong_bao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.thong_bao (
    id integer NOT NULL,
    nguoi_nhan_id integer NOT NULL,
    loai_thong_bao public.loai_thong_bao NOT NULL,
    tieu_de character varying(200) NOT NULL,
    noi_dung text NOT NULL,
    link character varying(500),
    da_doc boolean DEFAULT false NOT NULL,
    ngay_doc timestamp(3) without time zone,
    du_lieu_them jsonb,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.thong_bao OWNER TO postgres;

--
-- Name: thong_bao_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.thong_bao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.thong_bao_id_seq OWNER TO postgres;

--
-- Name: thong_bao_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.thong_bao_id_seq OWNED BY public.thong_bao.id;


--
-- Name: thong_tin_cong_ty; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.thong_tin_cong_ty (
    id integer NOT NULL,
    ten_cong_ty text NOT NULL,
    ma_so_thue text,
    dia_chi text,
    dien_thoai text,
    email text,
    website text,
    logo text,
    nguoi_dai_dien text,
    chuc_vu_dai_dien text,
    ngay_cong_chuan_mac_dinh integer DEFAULT 26 NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.thong_tin_cong_ty OWNER TO postgres;

--
-- Name: thong_tin_cong_ty_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.thong_tin_cong_ty_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.thong_tin_cong_ty_id_seq OWNER TO postgres;

--
-- Name: thong_tin_cong_ty_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.thong_tin_cong_ty_id_seq OWNED BY public.thong_tin_cong_ty.id;


--
-- Name: vai_tro; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vai_tro (
    id integer NOT NULL,
    ma_vai_tro text NOT NULL,
    ten_vai_tro text NOT NULL,
    mo_ta text,
    cap_do integer DEFAULT 0 NOT NULL,
    trang_thai boolean DEFAULT true NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.vai_tro OWNER TO postgres;

--
-- Name: vai_tro_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vai_tro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vai_tro_id_seq OWNER TO postgres;

--
-- Name: vai_tro_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vai_tro_id_seq OWNED BY public.vai_tro.id;


--
-- Name: vai_tro_quyen; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vai_tro_quyen (
    id integer NOT NULL,
    vai_tro_id integer NOT NULL,
    quyen_id integer NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.vai_tro_quyen OWNER TO postgres;

--
-- Name: vai_tro_quyen_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vai_tro_quyen_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vai_tro_quyen_id_seq OWNER TO postgres;

--
-- Name: vai_tro_quyen_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vai_tro_quyen_id_seq OWNED BY public.vai_tro_quyen.id;


--
-- Name: yeu_cau_sua_cong; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.yeu_cau_sua_cong (
    id integer NOT NULL,
    nhan_vien_id integer NOT NULL,
    ngay_cham_cong timestamp(3) without time zone NOT NULL,
    gio_vao_cu timestamp(3) without time zone,
    gio_ra_cu timestamp(3) without time zone,
    trang_thai_cu text,
    gio_vao_moi timestamp(3) without time zone,
    gio_ra_moi timestamp(3) without time zone,
    trang_thai_moi text,
    ly_do text NOT NULL,
    bang_chung text,
    trang_thai_duyet text DEFAULT 'CHO_DUYET'::text NOT NULL,
    nguoi_duyet_id integer,
    ngay_duyet timestamp(3) without time zone,
    ly_do_tu_choi text,
    nguoi_tao_id integer NOT NULL,
    ngay_tao timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ngay_cap_nhat timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.yeu_cau_sua_cong OWNER TO postgres;

--
-- Name: yeu_cau_sua_cong_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.yeu_cau_sua_cong_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.yeu_cau_sua_cong_id_seq OWNER TO postgres;

--
-- Name: yeu_cau_sua_cong_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.yeu_cau_sua_cong_id_seq OWNED BY public.yeu_cau_sua_cong.id;


--
-- Name: ai_rule_audit id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_rule_audit ALTER COLUMN id SET DEFAULT nextval('public.ai_rule_audit_id_seq'::regclass);


--
-- Name: audit_log id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_log ALTER COLUMN id SET DEFAULT nextval('public.audit_log_id_seq'::regclass);


--
-- Name: audit_sua_du_lieu id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_sua_du_lieu ALTER COLUMN id SET DEFAULT nextval('public.audit_sua_du_lieu_id_seq'::regclass);


--
-- Name: bac_thue_tncn id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bac_thue_tncn ALTER COLUMN id SET DEFAULT nextval('public.bac_thue_tncn_id_seq'::regclass);


--
-- Name: bang_ghi_cham_cong_gps id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bang_ghi_cham_cong_gps ALTER COLUMN id SET DEFAULT nextval('public.bang_ghi_cham_cong_gps_id_seq'::regclass);


--
-- Name: bang_luong id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bang_luong ALTER COLUMN id SET DEFAULT nextval('public.bang_luong_id_seq'::regclass);


--
-- Name: bang_luong_quy_che id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bang_luong_quy_che ALTER COLUMN id SET DEFAULT nextval('public.bang_luong_quy_che_id_seq'::regclass);


--
-- Name: bang_tinh_bhxh id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bang_tinh_bhxh ALTER COLUMN id SET DEFAULT nextval('public.bang_tinh_bhxh_id_seq'::regclass);


--
-- Name: bang_tinh_thue id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bang_tinh_thue ALTER COLUMN id SET DEFAULT nextval('public.bang_tinh_thue_id_seq'::regclass);


--
-- Name: bang_ung_luong id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bang_ung_luong ALTER COLUMN id SET DEFAULT nextval('public.bang_ung_luong_id_seq'::regclass);


--
-- Name: bien_so_cong_thuc id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bien_so_cong_thuc ALTER COLUMN id SET DEFAULT nextval('public.bien_so_cong_thuc_id_seq'::regclass);


--
-- Name: ca_lam_viec id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ca_lam_viec ALTER COLUMN id SET DEFAULT nextval('public.ca_lam_viec_id_seq'::regclass);


--
-- Name: cau_hinh_bhxh id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cau_hinh_bhxh ALTER COLUMN id SET DEFAULT nextval('public.cau_hinh_bhxh_id_seq'::regclass);


--
-- Name: cau_hinh_don_gia id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cau_hinh_don_gia ALTER COLUMN id SET DEFAULT nextval('public.cau_hinh_don_gia_id_seq'::regclass);


--
-- Name: cau_hinh_geofence id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cau_hinh_geofence ALTER COLUMN id SET DEFAULT nextval('public.cau_hinh_geofence_id_seq'::regclass);


--
-- Name: cau_hinh_import_phong_ban id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cau_hinh_import_phong_ban ALTER COLUMN id SET DEFAULT nextval('public.cau_hinh_import_phong_ban_id_seq'::regclass);


--
-- Name: cau_hinh_phat_cham_cong id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cau_hinh_phat_cham_cong ALTER COLUMN id SET DEFAULT nextval('public.cau_hinh_phat_cham_cong_id_seq'::regclass);


--
-- Name: cau_hinh_thue_tncn id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cau_hinh_thue_tncn ALTER COLUMN id SET DEFAULT nextval('public.cau_hinh_thue_tncn_id_seq'::regclass);


--
-- Name: cau_hinh_thuong_kpi id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cau_hinh_thuong_kpi ALTER COLUMN id SET DEFAULT nextval('public.cau_hinh_thuong_kpi_id_seq'::regclass);


--
-- Name: cham_cong id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cham_cong ALTER COLUMN id SET DEFAULT nextval('public.cham_cong_id_seq'::regclass);


--
-- Name: chat_analytics id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_analytics ALTER COLUMN id SET DEFAULT nextval('public.chat_analytics_id_seq'::regclass);


--
-- Name: chat_history id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_history ALTER COLUMN id SET DEFAULT nextval('public.chat_history_id_seq'::regclass);


--
-- Name: chi_tiet_bang_luong id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chi_tiet_bang_luong ALTER COLUMN id SET DEFAULT nextval('public.chi_tiet_bang_luong_id_seq'::regclass);


--
-- Name: chi_tiet_bang_ung_luong id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chi_tiet_bang_ung_luong ALTER COLUMN id SET DEFAULT nextval('public.chi_tiet_bang_ung_luong_id_seq'::regclass);


--
-- Name: chi_tiet_cham_cong id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chi_tiet_cham_cong ALTER COLUMN id SET DEFAULT nextval('public.chi_tiet_cham_cong_id_seq'::regclass);


--
-- Name: chi_tiet_nghi_phep_ngay id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chi_tiet_nghi_phep_ngay ALTER COLUMN id SET DEFAULT nextval('public.chi_tiet_nghi_phep_ngay_id_seq'::regclass);


--
-- Name: chi_tiet_phieu_dieu_chinh id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chi_tiet_phieu_dieu_chinh ALTER COLUMN id SET DEFAULT nextval('public.chi_tiet_phieu_dieu_chinh_id_seq'::regclass);


--
-- Name: chi_tieu_kpi id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chi_tieu_kpi ALTER COLUMN id SET DEFAULT nextval('public.chi_tieu_kpi_id_seq'::regclass);


--
-- Name: co_cau_luong id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.co_cau_luong ALTER COLUMN id SET DEFAULT nextval('public.co_cau_luong_id_seq'::regclass);


--
-- Name: co_cau_luong_chi_tiet id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.co_cau_luong_chi_tiet ALTER COLUMN id SET DEFAULT nextval('public.co_cau_luong_chi_tiet_id_seq'::regclass);


--
-- Name: cong_thuc_luong id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cong_thuc_luong ALTER COLUMN id SET DEFAULT nextval('public.cong_thuc_luong_id_seq'::regclass);


--
-- Name: danh_gia_kpi_nhan_vien id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.danh_gia_kpi_nhan_vien ALTER COLUMN id SET DEFAULT nextval('public.danh_gia_kpi_nhan_vien_id_seq'::regclass);


--
-- Name: danh_muc_loai_nghi id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.danh_muc_loai_nghi ALTER COLUMN id SET DEFAULT nextval('public.danh_muc_loai_nghi_id_seq'::regclass);


--
-- Name: danh_muc_loai_yeu_cau id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.danh_muc_loai_yeu_cau ALTER COLUMN id SET DEFAULT nextval('public.danh_muc_loai_yeu_cau_id_seq'::regclass);


--
-- Name: danh_muc_su_kien id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.danh_muc_su_kien ALTER COLUMN id SET DEFAULT nextval('public.danh_muc_su_kien_id_seq'::regclass);


--
-- Name: don_nghi_phep id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.don_nghi_phep ALTER COLUMN id SET DEFAULT nextval('public.don_nghi_phep_id_seq'::regclass);


--
-- Name: don_vi_con id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.don_vi_con ALTER COLUMN id SET DEFAULT nextval('public.don_vi_con_id_seq'::regclass);


--
-- Name: don_yeu_cau id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.don_yeu_cau ALTER COLUMN id SET DEFAULT nextval('public.don_yeu_cau_id_seq'::regclass);


--
-- Name: giao_hang id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.giao_hang ALTER COLUMN id SET DEFAULT nextval('public.giao_hang_id_seq'::regclass);


--
-- Name: ket_qua_kpi id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ket_qua_kpi ALTER COLUMN id SET DEFAULT nextval('public.ket_qua_kpi_id_seq'::regclass);


--
-- Name: khoan_luong id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.khoan_luong ALTER COLUMN id SET DEFAULT nextval('public.khoan_luong_id_seq'::regclass);


--
-- Name: ky_danh_gia_kpi id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ky_danh_gia_kpi ALTER COLUMN id SET DEFAULT nextval('public.ky_danh_gia_kpi_id_seq'::regclass);


--
-- Name: lich_phan_ca id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lich_phan_ca ALTER COLUMN id SET DEFAULT nextval('public.lich_phan_ca_id_seq'::regclass);


--
-- Name: lich_phan_ca_chi_tiet id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lich_phan_ca_chi_tiet ALTER COLUMN id SET DEFAULT nextval('public.lich_phan_ca_chi_tiet_id_seq'::regclass);


--
-- Name: lich_su_chinh_sua id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lich_su_chinh_sua ALTER COLUMN id SET DEFAULT nextval('public.lich_su_chinh_sua_id_seq'::regclass);


--
-- Name: lich_su_cong_thuc id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lich_su_cong_thuc ALTER COLUMN id SET DEFAULT nextval('public.lich_su_cong_thuc_id_seq'::regclass);


--
-- Name: lich_su_import id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lich_su_import ALTER COLUMN id SET DEFAULT nextval('public.lich_su_import_id_seq'::regclass);


--
-- Name: lich_su_sua_cong id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lich_su_sua_cong ALTER COLUMN id SET DEFAULT nextval('public.lich_su_sua_cong_id_seq'::regclass);


--
-- Name: lich_su_thiet_bi id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lich_su_thiet_bi ALTER COLUMN id SET DEFAULT nextval('public.lich_su_thiet_bi_id_seq'::regclass);


--
-- Name: mapping_excel id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mapping_excel ALTER COLUMN id SET DEFAULT nextval('public.mapping_excel_id_seq'::regclass);


--
-- Name: ngay_cong_bang_luong id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ngay_cong_bang_luong ALTER COLUMN id SET DEFAULT nextval('public.ngay_cong_bang_luong_id_seq'::regclass);


--
-- Name: nguoi_dung id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nguoi_dung ALTER COLUMN id SET DEFAULT nextval('public.nguoi_dung_id_seq'::regclass);


--
-- Name: nguoi_dung_vai_tro id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nguoi_dung_vai_tro ALTER COLUMN id SET DEFAULT nextval('public.nguoi_dung_vai_tro_id_seq'::regclass);


--
-- Name: nguoi_phu_thuoc id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nguoi_phu_thuoc ALTER COLUMN id SET DEFAULT nextval('public.nguoi_phu_thuoc_id_seq'::regclass);


--
-- Name: nhan_vien id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien ALTER COLUMN id SET DEFAULT nextval('public.nhan_vien_id_seq'::regclass);


--
-- Name: nhan_vien_hop_dong id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien_hop_dong ALTER COLUMN id SET DEFAULT nextval('public.nhan_vien_hop_dong_id_seq'::regclass);


--
-- Name: nhan_vien_ngan_hang id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien_ngan_hang ALTER COLUMN id SET DEFAULT nextval('public.nhan_vien_ngan_hang_id_seq'::regclass);


--
-- Name: nhan_vien_phong_ban id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien_phong_ban ALTER COLUMN id SET DEFAULT nextval('public.nhan_vien_phong_ban_id_seq'::regclass);


--
-- Name: nhan_vien_thue_bh id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien_thue_bh ALTER COLUMN id SET DEFAULT nextval('public.nhan_vien_thue_bh_id_seq'::regclass);


--
-- Name: nhan_vien_thuoc_nhom id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien_thuoc_nhom ALTER COLUMN id SET DEFAULT nextval('public.nhan_vien_thuoc_nhom_id_seq'::regclass);


--
-- Name: nhan_vien_trach_nhiem id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien_trach_nhiem ALTER COLUMN id SET DEFAULT nextval('public.nhan_vien_trach_nhiem_id_seq'::regclass);


--
-- Name: nhom_nhan_vien id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhom_nhan_vien ALTER COLUMN id SET DEFAULT nextval('public.nhom_nhan_vien_id_seq'::regclass);


--
-- Name: phan_quyen_phong_ban id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phan_quyen_phong_ban ALTER COLUMN id SET DEFAULT nextval('public.phan_quyen_phong_ban_id_seq'::regclass);


--
-- Name: phien_dang_nhap id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phien_dang_nhap ALTER COLUMN id SET DEFAULT nextval('public.phien_dang_nhap_id_seq'::regclass);


--
-- Name: phieu_dieu_chinh id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phieu_dieu_chinh ALTER COLUMN id SET DEFAULT nextval('public.phieu_dieu_chinh_id_seq'::regclass);


--
-- Name: phong_ban id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phong_ban ALTER COLUMN id SET DEFAULT nextval('public.phong_ban_id_seq'::regclass);


--
-- Name: phu_cap_nhan_vien id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phu_cap_nhan_vien ALTER COLUMN id SET DEFAULT nextval('public.phu_cap_nhan_vien_id_seq'::regclass);


--
-- Name: quy_che id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quy_che ALTER COLUMN id SET DEFAULT nextval('public.quy_che_id_seq'::regclass);


--
-- Name: quy_che_rule id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quy_che_rule ALTER COLUMN id SET DEFAULT nextval('public.quy_che_rule_id_seq'::regclass);


--
-- Name: quyen id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quyen ALTER COLUMN id SET DEFAULT nextval('public.quyen_id_seq'::regclass);


--
-- Name: request_mapping_cham_cong id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_mapping_cham_cong ALTER COLUMN id SET DEFAULT nextval('public.request_mapping_cham_cong_id_seq'::regclass);


--
-- Name: request_workflow_config id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_workflow_config ALTER COLUMN id SET DEFAULT nextval('public.request_workflow_config_id_seq'::regclass);


--
-- Name: rule_trace id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rule_trace ALTER COLUMN id SET DEFAULT nextval('public.rule_trace_id_seq'::regclass);


--
-- Name: san_luong_chia_hang id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.san_luong_chia_hang ALTER COLUMN id SET DEFAULT nextval('public.san_luong_chia_hang_id_seq'::regclass);


--
-- Name: snapshot_bang_luong id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snapshot_bang_luong ALTER COLUMN id SET DEFAULT nextval('public.snapshot_bang_luong_id_seq'::regclass);


--
-- Name: snapshot_bang_ung_luong id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snapshot_bang_ung_luong ALTER COLUMN id SET DEFAULT nextval('public.snapshot_bang_ung_luong_id_seq'::regclass);


--
-- Name: snapshot_chi_tiet_bang_ung_luong id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snapshot_chi_tiet_bang_ung_luong ALTER COLUMN id SET DEFAULT nextval('public.snapshot_chi_tiet_bang_ung_luong_id_seq'::regclass);


--
-- Name: snapshot_giao_hang id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snapshot_giao_hang ALTER COLUMN id SET DEFAULT nextval('public.snapshot_giao_hang_id_seq'::regclass);


--
-- Name: snapshot_san_luong_chia_hang id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snapshot_san_luong_chia_hang ALTER COLUMN id SET DEFAULT nextval('public.snapshot_san_luong_chia_hang_id_seq'::regclass);


--
-- Name: su_kien_thuong_phat id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.su_kien_thuong_phat ALTER COLUMN id SET DEFAULT nextval('public.su_kien_thuong_phat_id_seq'::regclass);


--
-- Name: template_kpi id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.template_kpi ALTER COLUMN id SET DEFAULT nextval('public.template_kpi_id_seq'::regclass);


--
-- Name: thiet_bi_nhan_vien id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thiet_bi_nhan_vien ALTER COLUMN id SET DEFAULT nextval('public.thiet_bi_nhan_vien_id_seq'::regclass);


--
-- Name: thong_bao id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thong_bao ALTER COLUMN id SET DEFAULT nextval('public.thong_bao_id_seq'::regclass);


--
-- Name: thong_tin_cong_ty id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thong_tin_cong_ty ALTER COLUMN id SET DEFAULT nextval('public.thong_tin_cong_ty_id_seq'::regclass);


--
-- Name: vai_tro id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vai_tro ALTER COLUMN id SET DEFAULT nextval('public.vai_tro_id_seq'::regclass);


--
-- Name: vai_tro_quyen id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vai_tro_quyen ALTER COLUMN id SET DEFAULT nextval('public.vai_tro_quyen_id_seq'::regclass);


--
-- Name: yeu_cau_sua_cong id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.yeu_cau_sua_cong ALTER COLUMN id SET DEFAULT nextval('public.yeu_cau_sua_cong_id_seq'::regclass);


--
-- Data for Name: ai_rule_audit; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ai_rule_audit (id, nguoi_tao_id, phong_ban_id, quy_che_id, prompt_goc, response_json, trang_thai, rule_ap_dung_id, tao_luc) FROM stdin;
1	1	27	1	thời gian làm việc là tất cả các ngày trong tháng. Lương căn bản và các khoản phụ cấp được tính trên ngày công thực tế	{"hopLeSoBo":false,"canLamRo":["Không thể xác định loại rule. Vui lòng mô tả rõ hơn cách tính."]}	DE_XUAT	\N	2026-01-21 06:05:05.015
2	1	27	1	thời gian làm việc là tất cả các ngày trong tháng. Lương căn bản và các khoản phụ cấp được tính trên ngày công thực tế	{"hopLeSoBo":false,"canLamRo":["Không thể xác định loại rule. Vui lòng mô tả rõ hơn cách tính."]}	DE_XUAT	\N	2026-01-21 06:05:36.094
\.


--
-- Data for Name: audit_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.audit_log (id, nguoi_dung_id, ten_dang_nhap, hanh_dong, bang_du_lieu, ban_ghi_id, du_lieu_cu, du_lieu_moi, dia_chi_ip, user_agent, mo_ta, ngay_tao) FROM stdin;
1	\N	admin	DANG_NHAP	nguoi_dung	\N	\N	\N	::ffff:172.18.0.3	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	Đăng nhập thất bại - Không tìm thấy user	2026-01-15 03:25:57.744
2	\N	admin	DANG_NHAP	nguoi_dung	\N	\N	\N	::ffff:172.18.0.3	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	Đăng nhập thất bại - Không tìm thấy user	2026-01-15 03:26:19.978
3	\N	admin	DANG_NHAP	nguoi_dung	\N	\N	\N	::ffff:172.18.0.3	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	Đăng nhập thất bại - Không tìm thấy user	2026-01-15 03:27:12.243
4	\N	admin	DANG_NHAP	nguoi_dung	\N	\N	\N	::ffff:172.18.0.3	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	Đăng nhập thất bại - Không tìm thấy user	2026-01-15 03:44:11.123
5	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:192.168.65.1	curl/8.7.1	Đăng nhập thành công	2026-01-15 03:46:24.827
6	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.18.0.3	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	Đăng nhập thành công	2026-01-15 03:47:53.144
7	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.18.0.2	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	Đăng nhập thành công	2026-01-16 00:27:12.964
8	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.18.0.1	curl/8.7.1	Đăng nhập thành công	2026-01-16 02:06:01.492
9	\N	admin	DANG_NHAP	nguoi_dung	\N	\N	\N	::ffff:192.168.65.1	curl/8.7.1	Đăng nhập thất bại - Sai mật khẩu	2026-01-16 02:38:06.507
10	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:192.168.65.1	curl/8.7.1	Đăng nhập thành công	2026-01-16 02:39:00.958
11	\N	admin	DANG_NHAP	nguoi_dung	\N	\N	\N	::ffff:172.66.156.100	curl/8.7.1	Đăng nhập thất bại - Sai mật khẩu	2026-01-16 06:25:19.984
12	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.66.156.100	curl/8.7.1	Đăng nhập thành công	2026-01-16 06:25:30.77
13	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.66.156.100	curl/8.7.1	Đăng nhập thành công	2026-01-16 06:50:59.563
14	\N	system	CHOT_LUONG	BangUngLuong	92	\N	\N	\N	\N	Chốt bảng ứng lương UL2026-01-30	2026-01-16 07:34:15.658
15	\N	system	CAP_NHAT	BangUngLuong	92	\N	\N	\N	\N	Ghi nhận khấu trừ 3 nhân viên vào bảng lương 91	2026-01-16 07:34:26.524
16	\N	system	CHOT_LUONG	BangUngLuong	92	\N	\N	\N	\N	Khóa bảng ứng lương UL2026-01-30	2026-01-16 07:56:32.674
17	\N	admin	XOA	BangLuong	1	\N	\N	\N	\N	ADMIN xóa bảng lương đã KHOA: Bảng lương Chia hàng - Tháng 1/2026 (T1/2026)	2026-01-16 07:57:47.384
18	\N	system	TAO_MOI	BangUngLuong	96	\N	{"id":96,"maBangUngLuong":"UL-202601-10","thangNam":"2026-01","tuNgay":"2026-01-01T00:00:00.000Z","denNgay":"2026-01-15T00:00:00.000Z","ngayChiTra":"2026-01-16T00:00:00.000Z","phongBanId":30,"trangThai":"NHAP","cauHinhJson":"{\\"chuyen_can\\":{\\"so_ngay_nghi_toi_da\\":2,\\"cam_neu_nghi_khong_phep\\":true},\\"ung_luong\\":{\\"ti_le_toi_da\\":0.7,\\"lam_tron\\":10000}}","tongSoTienUng":"0","soNhanVienUng":0,"ghiChu":"","daGhiNhanKhauTru":false,"refPhieuDCId":null,"nguoiTao":"system","ngayTao":"2026-01-16T08:02:19.727Z","ngayCapNhat":"2026-01-16T08:02:19.727Z","nguoiChot":null,"ngayChot":null,"nguoiKhoa":null,"ngayKhoa":null}	\N	\N	Tạo bảng ứng lương UL-202601-10	2026-01-16 08:02:19.732
19	\N	system	CAP_NHAT	BangUngLuong	96	\N	\N	\N	\N	Sinh danh sách 3 nhân viên cho bảng ứng lương	2026-01-16 08:02:28.057
20	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.18.0.3	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	Đăng nhập thành công	2026-01-17 05:23:56.942
21	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.18.0.4	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	Đăng nhập thành công	2026-01-20 06:13:58.138
22	\N	admin	CHOT_LUONG	BangUngLuong	86	\N	\N	\N	\N	Chốt bảng ứng lương UL2026-01-27	2026-01-20 06:21:17.488
23	\N	admin	CAP_NHAT	BangUngLuong	86	\N	\N	\N	\N	Ghi nhận khấu trừ 11 nhân viên vào bảng lương 92	2026-01-20 06:21:29.188
24	\N	admin	DANG_NHAP	nguoi_dung	\N	\N	\N	::ffff:172.66.156.100	curl/8.7.1	Đăng nhập thất bại - Sai mật khẩu	2026-01-20 06:36:50.102
25	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.66.156.100	curl/8.7.1	Đăng nhập thành công	2026-01-20 06:37:04.4
26	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.66.156.100	curl/8.7.1	Đăng nhập thành công	2026-01-20 06:37:48.214
27	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.66.156.100	curl/8.7.1	Đăng nhập thành công	2026-01-20 06:37:55.505
28	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.66.156.100	curl/8.7.1	Đăng nhập thành công	2026-01-20 06:40:03.818
29	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.66.156.100	curl/8.7.1	Đăng nhập thành công	2026-01-20 06:40:16.721
30	1	admin	CHOT_LUONG	bang_luong	79	\N	{"thang":12,"nam":2025,"phongBan":"Giao Hàng"}	\N	\N	Chốt bảng lương Giao Hàng tháng 12/2025	2026-01-20 06:40:16.769
31	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.66.156.100	curl/8.7.1	Đăng nhập thành công	2026-01-20 06:41:09.918
32	1	admin	CHOT_LUONG	bang_luong	92	\N	{"thang":1,"nam":2026,"phongBan":"Chia hàng"}	\N	\N	Chốt bảng lương Chia hàng tháng 1/2026	2026-01-20 06:41:10.13
33	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.66.156.100	node	Đăng nhập thành công	2026-01-20 07:05:42.654
34	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.66.156.100	node	Đăng nhập thành công	2026-01-20 07:07:28.508
35	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.66.156.100	node	Đăng nhập thành công	2026-01-20 07:08:59.721
36	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.66.156.100	curl/8.7.1	Đăng nhập thành công	2026-01-20 07:10:43.451
37	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.66.156.100	node	Đăng nhập thành công	2026-01-20 07:11:42.915
38	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.66.156.100	node	Đăng nhập thành công	2026-01-20 07:12:09.845
39	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.66.156.100	node	Đăng nhập thành công	2026-01-20 07:14:57.942
40	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.66.156.100	curl/8.7.1	Đăng nhập thành công	2026-01-20 07:52:22.681
41	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.66.156.100	curl/8.7.1	Đăng nhập thành công	2026-01-20 07:52:30.099
42	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.66.156.100	curl/8.7.1	Đăng nhập thành công	2026-01-20 07:52:43.115
43	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.66.156.100	curl/8.7.1	Đăng nhập thành công	2026-01-20 07:53:09.438
44	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.66.156.100	curl/8.7.1	Đăng nhập thành công	2026-01-20 07:53:18.69
45	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.66.156.100	curl/8.7.1	Đăng nhập thành công	2026-01-20 07:58:31.718
46	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.66.156.100	curl/8.7.1	Đăng nhập thành công	2026-01-20 07:58:48.837
47	\N	admin	CHAY_RULE_ENGINE	bang_luong	92	\N	{"quyCheId":1,"soNhanVien":11,"thoiGianXuLy":193}	\N	\N	Chạy Rule Engine cho bảng lương 92	2026-01-20 07:58:49.052
48	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.66.156.100	curl/8.7.1	Đăng nhập thành công	2026-01-20 07:58:56.92
49	\N	admin	CHAY_RULE_ENGINE	bang_luong	94	\N	{"quyCheId":2,"soNhanVien":6,"thoiGianXuLy":113}	\N	\N	Chạy Rule Engine cho bảng lương 94	2026-01-20 07:58:57.063
50	\N	admin	XOA	BangUngLuong	96	{"id":96,"maBangUngLuong":"UL-202601-10","thangNam":"2026-01","tuNgay":"2026-01-01T00:00:00.000Z","denNgay":"2026-01-15T00:00:00.000Z","ngayChiTra":"2026-01-16T00:00:00.000Z","phongBanId":30,"trangThai":"NHAP","cauHinhJson":"{\\"chuyen_can\\":{\\"so_ngay_nghi_toi_da\\":2,\\"cam_neu_nghi_khong_phep\\":true},\\"ung_luong\\":{\\"ti_le_toi_da\\":0.7,\\"lam_tron\\":10000}}","tongSoTienUng":"0","soNhanVienUng":0,"ghiChu":"","daGhiNhanKhauTru":false,"refPhieuDCId":null,"nguoiTao":"system","ngayTao":"2026-01-16T08:02:19.727Z","ngayCapNhat":"2026-01-16T08:02:19.727Z","nguoiChot":null,"ngayChot":null,"nguoiKhoa":null,"ngayKhoa":null}	\N	\N	\N	Xóa bảng ứng lương UL-202601-10	2026-01-20 08:07:17.887
51	\N	admin	TAO_MOI	BangUngLuong	97	\N	{"id":97,"maBangUngLuong":"UL-202601-10","thangNam":"2026-01","tuNgay":"2026-01-01T00:00:00.000Z","denNgay":"2026-01-15T00:00:00.000Z","ngayChiTra":"2026-01-25T00:00:00.000Z","phongBanId":30,"trangThai":"NHAP","cauHinhJson":"{\\"chuyen_can\\":{\\"so_ngay_nghi_toi_da\\":2,\\"cam_neu_nghi_khong_phep\\":true},\\"ung_luong\\":{\\"ti_le_toi_da\\":0.7,\\"lam_tron\\":10000}}","tongSoTienUng":"0","soNhanVienUng":0,"ghiChu":"","daGhiNhanKhauTru":false,"refPhieuDCId":null,"nguoiTao":"admin","ngayTao":"2026-01-20T08:07:32.763Z","ngayCapNhat":"2026-01-20T08:07:32.763Z","nguoiChot":null,"ngayChot":null,"nguoiKhoa":null,"ngayKhoa":null}	\N	\N	Tạo bảng ứng lương UL-202601-10	2026-01-20 08:07:32.768
52	\N	admin	CAP_NHAT	BangUngLuong	97	\N	\N	\N	\N	Sinh danh sách 3 nhân viên cho bảng ứng lương	2026-01-20 08:07:38.774
53	\N	admin	CHOT_LUONG	BangUngLuong	97	\N	\N	\N	\N	Chốt bảng ứng lương UL-202601-10	2026-01-20 08:21:11.476
54	\N	admin	CAP_NHAT	BangUngLuong	97	\N	\N	\N	\N	Ghi nhận khấu trừ 3 nhân viên vào bảng lương 97	2026-01-20 08:21:17.166
86	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.18.0.2	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	Đăng nhập thành công	2026-01-21 00:35:30.917
87	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.18.0.2	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	Đăng nhập thành công	2026-01-23 00:50:00.813
88	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.18.0.4	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	Đăng nhập thành công	2026-01-23 02:33:13.636
89	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.19.0.4	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	Đăng nhập thành công	2026-01-23 05:57:06.36
90	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.19.0.4	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	Đăng nhập thành công	2026-01-23 06:03:54.643
91	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.19.0.4	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	Đăng nhập thành công	2026-01-23 06:06:34.528
92	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.19.0.4	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	Đăng nhập thành công	2026-01-23 07:45:20.518
93	\N	admin	DANG_NHAP	nguoi_dung	\N	\N	\N	::ffff:172.19.0.1	curl/7.68.0	Đăng nhập thất bại - Sai mật khẩu	2026-01-24 00:33:34.952
94	\N	admin	DANG_NHAP	nguoi_dung	\N	\N	\N	::ffff:172.19.0.1	curl/7.68.0	Đăng nhập thất bại - Sai mật khẩu	2026-01-24 00:33:48.536
95	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.19.0.1	curl/7.68.0	Đăng nhập thành công	2026-01-24 00:34:02.705
96	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.19.0.1	curl/7.68.0	Đăng nhập thành công	2026-01-24 00:36:09.737
97	19	NV0001	DANG_NHAP	nguoi_dung	19	\N	\N	::ffff:172.19.0.1	curl/7.68.0	Đăng nhập thành công	2026-01-24 00:39:28.775
98	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.19.0.4	curl/8.7.1	Đăng nhập thành công	2026-01-24 00:40:37.025
99	1	admin	DANG_NHAP	nguoi_dung	1	\N	\N	::ffff:172.19.0.4	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	Đăng nhập thành công	2026-01-24 00:41:16.587
100	\N	Nv0001	DANG_NHAP	nguoi_dung	\N	\N	\N	::ffff:172.19.0.4	Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1	Đăng nhập thất bại - Không tìm thấy user	2026-01-24 00:41:41.76
101	19	NV0001	DANG_NHAP	nguoi_dung	19	\N	\N	::ffff:172.19.0.4	Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1	Đăng nhập thành công	2026-01-24 00:41:49.608
102	22	NV0005	DANG_NHAP	nguoi_dung	22	\N	\N	::ffff:172.19.0.4	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	Đăng nhập thành công	2026-01-24 00:42:24.516
\.


--
-- Data for Name: audit_sua_du_lieu; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.audit_sua_du_lieu (id, loai_du_lieu, ban_ghi_id, du_lieu_truoc_json, du_lieu_sau_json, ly_do, sua_boi, sua_luc) FROM stdin;
\.


--
-- Data for Name: bac_thue_tncn; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bac_thue_tncn (id, cau_hinh_thue_id, bac, tu_muc, den_muc, thue_suat, so_tien_tru_nhanh, ngay_tao) FROM stdin;
1	1	1	0	5000000	5.00	0	2026-01-23 05:53:30.257
2	2	1	0	5000000	5.00	0	2026-01-23 05:53:30.257
3	1	2	5000000	10000000	10.00	250000	2026-01-23 05:53:30.257
4	2	2	5000000	10000000	10.00	250000	2026-01-23 05:53:30.257
5	1	3	10000000	18000000	15.00	750000	2026-01-23 05:53:30.257
6	2	3	10000000	18000000	15.00	750000	2026-01-23 05:53:30.257
7	1	4	18000000	32000000	20.00	1650000	2026-01-23 05:53:30.257
8	2	4	18000000	32000000	20.00	1650000	2026-01-23 05:53:30.257
9	1	5	32000000	52000000	25.00	3250000	2026-01-23 05:53:30.257
10	2	5	32000000	52000000	25.00	3250000	2026-01-23 05:53:30.257
11	1	6	52000000	80000000	30.00	5850000	2026-01-23 05:53:30.257
12	2	6	52000000	80000000	30.00	5850000	2026-01-23 05:53:30.257
13	1	7	80000000	\N	35.00	9850000	2026-01-23 05:53:30.257
14	2	7	80000000	\N	35.00	9850000	2026-01-23 05:53:30.257
\.


--
-- Data for Name: bang_ghi_cham_cong_gps; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bang_ghi_cham_cong_gps (id, nhan_vien_id, thoi_gian, loai_cham_cong, vi_do, kinh_do, do_chinh_xac_met, geofence_id, khoang_cach_met, trong_vung, trang_thai, ghi_chu, device_id, user_agent, ip_address, ngay_tao) FROM stdin;
1	40	2026-01-24 00:48:49.596	CHECK_IN	\N	\N	\N	\N	\N	\N	HOP_LE	\N	WEB-1769215729459-m7lowh3vy	Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1	::ffff:172.19.0.4	2026-01-24 00:48:49.6
2	40	2026-01-24 00:48:54.313	CHECK_IN	\N	\N	\N	\N	\N	\N	HOP_LE	\N	WEB-1769215729459-m7lowh3vy	Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1	::ffff:172.19.0.4	2026-01-24 00:48:54.316
3	40	2026-01-24 00:48:55.179	CHECK_IN	\N	\N	\N	\N	\N	\N	HOP_LE	\N	WEB-1769215729459-m7lowh3vy	Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1	::ffff:172.19.0.4	2026-01-24 00:48:55.182
4	40	2026-01-24 00:48:55.831	CHECK_IN	\N	\N	\N	\N	\N	\N	HOP_LE	\N	WEB-1769215729459-m7lowh3vy	Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1	::ffff:172.19.0.4	2026-01-24 00:48:55.834
5	40	2026-01-24 00:48:56.684	CHECK_IN	\N	\N	\N	\N	\N	\N	HOP_LE	\N	WEB-1769215729459-m7lowh3vy	Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1	::ffff:172.19.0.4	2026-01-24 00:48:56.687
\.


--
-- Data for Name: bang_luong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bang_luong (id, thang, nam, phong_ban_id, ten_bang_luong, trang_thai, ngay_chot, nguoi_chot, ghi_chu, ngay_tao, ngay_cap_nhat) FROM stdin;
7	6	2025	29	Bảng lương Giao Hàng - Tháng 6/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
8	6	2025	23	Bảng lương Kế toán - Tháng 6/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
9	6	2025	27	Bảng lương Chia hàng - Tháng 6/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
10	6	2025	32	Bảng lương Giao hàng - Tháng 6/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
11	6	2025	25	Bảng lương Đơn hàng - Tháng 6/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
12	6	2025	33	Bảng lương Thu mua - Tháng 6/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
13	6	2025	34	Bảng lương Khối Văn Phòng - Tháng 6/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
14	6	2025	26	Bảng lương Kho vận - Tháng 6/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
15	6	2025	30	Bảng lương Kế Toán - Tháng 6/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
16	6	2025	24	Bảng lương Marketing - Tháng 6/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
17	6	2025	28	Bảng lương Nhân Sự - Tháng 6/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
18	6	2025	31	Bảng lương Kinh Doanh - Tháng 6/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
19	7	2025	29	Bảng lương Giao Hàng - Tháng 7/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
20	7	2025	23	Bảng lương Kế toán - Tháng 7/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
21	7	2025	27	Bảng lương Chia hàng - Tháng 7/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
22	7	2025	32	Bảng lương Giao hàng - Tháng 7/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
23	7	2025	25	Bảng lương Đơn hàng - Tháng 7/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
24	7	2025	33	Bảng lương Thu mua - Tháng 7/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
25	7	2025	34	Bảng lương Khối Văn Phòng - Tháng 7/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
26	7	2025	26	Bảng lương Kho vận - Tháng 7/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
27	7	2025	30	Bảng lương Kế Toán - Tháng 7/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
28	7	2025	24	Bảng lương Marketing - Tháng 7/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
29	7	2025	28	Bảng lương Nhân Sự - Tháng 7/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
30	7	2025	31	Bảng lương Kinh Doanh - Tháng 7/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
31	8	2025	29	Bảng lương Giao Hàng - Tháng 8/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
32	8	2025	23	Bảng lương Kế toán - Tháng 8/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
33	8	2025	27	Bảng lương Chia hàng - Tháng 8/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
34	8	2025	32	Bảng lương Giao hàng - Tháng 8/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
35	8	2025	25	Bảng lương Đơn hàng - Tháng 8/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
36	8	2025	33	Bảng lương Thu mua - Tháng 8/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
37	8	2025	34	Bảng lương Khối Văn Phòng - Tháng 8/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
38	8	2025	26	Bảng lương Kho vận - Tháng 8/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
39	8	2025	30	Bảng lương Kế Toán - Tháng 8/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
40	8	2025	24	Bảng lương Marketing - Tháng 8/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
41	8	2025	28	Bảng lương Nhân Sự - Tháng 8/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
42	8	2025	31	Bảng lương Kinh Doanh - Tháng 8/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
43	9	2025	29	Bảng lương Giao Hàng - Tháng 9/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
44	9	2025	23	Bảng lương Kế toán - Tháng 9/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
45	9	2025	27	Bảng lương Chia hàng - Tháng 9/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
46	9	2025	32	Bảng lương Giao hàng - Tháng 9/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
47	9	2025	25	Bảng lương Đơn hàng - Tháng 9/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
48	9	2025	33	Bảng lương Thu mua - Tháng 9/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
49	9	2025	34	Bảng lương Khối Văn Phòng - Tháng 9/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
50	9	2025	26	Bảng lương Kho vận - Tháng 9/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
51	9	2025	30	Bảng lương Kế Toán - Tháng 9/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
52	9	2025	24	Bảng lương Marketing - Tháng 9/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
53	9	2025	28	Bảng lương Nhân Sự - Tháng 9/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
54	9	2025	31	Bảng lương Kinh Doanh - Tháng 9/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
55	10	2025	29	Bảng lương Giao Hàng - Tháng 10/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
56	10	2025	23	Bảng lương Kế toán - Tháng 10/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
57	10	2025	27	Bảng lương Chia hàng - Tháng 10/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
58	10	2025	32	Bảng lương Giao hàng - Tháng 10/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
59	10	2025	25	Bảng lương Đơn hàng - Tháng 10/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
60	10	2025	33	Bảng lương Thu mua - Tháng 10/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
61	10	2025	34	Bảng lương Khối Văn Phòng - Tháng 10/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
62	10	2025	26	Bảng lương Kho vận - Tháng 10/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
63	10	2025	30	Bảng lương Kế Toán - Tháng 10/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
64	10	2025	24	Bảng lương Marketing - Tháng 10/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
65	10	2025	28	Bảng lương Nhân Sự - Tháng 10/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
66	10	2025	31	Bảng lương Kinh Doanh - Tháng 10/2025	KHOA	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
67	11	2025	29	Bảng lương Giao Hàng - Tháng 11/2025	DA_CHOT	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
68	11	2025	23	Bảng lương Kế toán - Tháng 11/2025	DA_CHOT	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
69	11	2025	27	Bảng lương Chia hàng - Tháng 11/2025	DA_CHOT	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
70	11	2025	32	Bảng lương Giao hàng - Tháng 11/2025	DA_CHOT	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
71	11	2025	25	Bảng lương Đơn hàng - Tháng 11/2025	DA_CHOT	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
72	11	2025	33	Bảng lương Thu mua - Tháng 11/2025	DA_CHOT	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
73	11	2025	34	Bảng lương Khối Văn Phòng - Tháng 11/2025	DA_CHOT	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
74	11	2025	26	Bảng lương Kho vận - Tháng 11/2025	DA_CHOT	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
75	11	2025	30	Bảng lương Kế Toán - Tháng 11/2025	DA_CHOT	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
76	11	2025	24	Bảng lương Marketing - Tháng 11/2025	DA_CHOT	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
77	11	2025	28	Bảng lương Nhân Sự - Tháng 11/2025	DA_CHOT	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
78	11	2025	31	Bảng lương Kinh Doanh - Tháng 11/2025	DA_CHOT	2026-01-16 03:41:21.368	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
80	12	2025	23	Bảng lương Kế toán - Tháng 12/2025	NHAP	\N	\N	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
81	12	2025	27	Bảng lương Chia hàng - Tháng 12/2025	NHAP	\N	\N	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
82	12	2025	32	Bảng lương Giao hàng - Tháng 12/2025	NHAP	\N	\N	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
83	12	2025	25	Bảng lương Đơn hàng - Tháng 12/2025	NHAP	\N	\N	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
84	12	2025	33	Bảng lương Thu mua - Tháng 12/2025	NHAP	\N	\N	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
85	12	2025	34	Bảng lương Khối Văn Phòng - Tháng 12/2025	NHAP	\N	\N	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
86	12	2025	26	Bảng lương Kho vận - Tháng 12/2025	NHAP	\N	\N	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
87	12	2025	30	Bảng lương Kế Toán - Tháng 12/2025	NHAP	\N	\N	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
88	12	2025	24	Bảng lương Marketing - Tháng 12/2025	NHAP	\N	\N	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
89	12	2025	28	Bảng lương Nhân Sự - Tháng 12/2025	NHAP	\N	\N	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
90	12	2025	31	Bảng lương Kinh Doanh - Tháng 12/2025	NHAP	\N	\N	Seed data 2025	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
93	1	2026	34	Bảng lương Khối Văn Phòng - Tháng 1/2026	NHAP	\N	\N	\N	2026-01-20 06:14:25.094	2026-01-20 06:14:25.094
94	1	2026	32	Bảng lương Giao hàng - Tháng 1/2026	NHAP	\N	\N	\N	2026-01-20 06:14:25.099	2026-01-20 06:14:25.099
95	1	2026	26	Bảng lương Kho vận - Tháng 1/2026	NHAP	\N	\N	\N	2026-01-20 06:14:25.113	2026-01-20 06:14:25.113
96	1	2026	31	Bảng lương Kinh Doanh - Tháng 1/2026	NHAP	\N	\N	\N	2026-01-20 06:14:25.126	2026-01-20 06:14:25.126
99	1	2026	28	Bảng lương Nhân Sự - Tháng 1/2026	NHAP	\N	\N	\N	2026-01-20 06:14:25.352	2026-01-20 06:14:25.352
100	1	2026	25	Bảng lương Đơn hàng - Tháng 1/2026	NHAP	\N	\N	\N	2026-01-20 06:14:25.367	2026-01-20 06:14:25.367
101	1	2026	33	Bảng lương Thu mua - Tháng 1/2026	NHAP	\N	\N	\N	2026-01-20 06:14:25.369	2026-01-20 06:14:25.369
79	12	2025	29	Bảng lương Giao Hàng - Tháng 12/2025	DA_CHOT	2026-01-20 06:40:16.759	admin	Seed data 2025	2026-01-16 03:41:21.368	2026-01-20 06:40:16.766
98	1	2026	24	Bảng lương Marketing - Tháng 1/2026	DA_CHOT	2026-01-20 06:37:55.592	admin	\N	2026-01-20 06:14:25.293	2026-01-20 07:14:58.162
102	1	2026	30	Bảng lương Kế Toán - Tháng 1/2026	NHAP	\N	\N	\N	2026-01-21 00:37:39.612	2026-01-21 00:37:39.612
103	1	2026	27	Bảng lương Chia hàng - Tháng 1/2026	NHAP	\N	\N	\N	2026-01-21 00:45:51.451	2026-01-21 00:45:51.451
\.


--
-- Data for Name: bang_luong_quy_che; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bang_luong_quy_che (id, bang_luong_id, quy_che_id, ngay_ap_dung, nguoi_ap_dung, ngay_tao) FROM stdin;
2	94	2	2026-01-20 07:58:57.06	admin	2026-01-20 07:58:21.995
\.


--
-- Data for Name: bang_tinh_bhxh; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bang_tinh_bhxh (id, bang_luong_id, nhan_vien_id, luong_dong_bhxh, bhxh_nv, bhyt_nv, bhtn_nv, tong_bh_nv, bhxh_dn, bhyt_dn, bhtn_dn, tong_bh_dn, ngay_tao) FROM stdin;
1	98	73	20823594	1665888	312354	208236	2186478	3644129	624708	208236	4477073	2026-01-20 06:37:55.56
2	98	74	17498431	1399874	262476	174984	1837334	3062225	524953	174984	3762162	2026-01-20 06:37:55.575
3	92	52	22367849	1789428	335518	223678	2348624	3914374	671035	223678	4809087	2026-01-20 06:41:09.971
4	92	53	23893474	1911478	358402	238935	2508815	4181358	716804	238935	5137097	2026-01-20 06:41:09.987
5	92	54	8135348	650828	122030	81353	854211	1423686	244060	81353	1749099	2026-01-20 06:41:09.996
6	92	56	9843573	787486	147654	98436	1033576	1722625	295307	98436	2116368	2026-01-20 06:41:10.005
7	92	57	24883067	1990645	373246	248831	2612722	4354537	746492	248831	5349860	2026-01-20 06:41:10.012
8	92	58	4550000	364000	68250	45500	477750	796250	136500	45500	978250	2026-01-20 06:41:10.02
9	92	59	8827070	706166	132406	88271	926843	1544737	264812	88271	1897820	2026-01-20 06:41:10.028
10	92	60	13295806	1063664	199437	132958	1396059	2326766	398874	132958	2858598	2026-01-20 06:41:10.038
11	92	63	24730984	1978479	370965	247310	2596754	4327922	741930	247310	5317162	2026-01-20 06:41:10.048
12	92	64	8024563	641965	120368	80246	842579	1404299	240737	80246	1725282	2026-01-20 06:41:10.058
13	92	75	10699264	855941	160489	106993	1123423	1872371	320978	106993	2300342	2026-01-20 06:41:10.065
\.


--
-- Data for Name: bang_tinh_thue; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bang_tinh_thue (id, bang_luong_id, nhan_vien_id, thu_nhap_chiu_thue, giam_tru_ban_than, so_phu_thuoc, giam_tru_phu_thuoc, giam_tru_bhxh, thu_nhap_tinh_thue, thue_tncn, bac_thue_ap_dung, ngay_tao) FROM stdin;
1	98	73	22747328	11000000	0	0	2186478	9560850	706085	2	2026-01-20 06:37:55.564
2	98	74	19877263	11000000	0	0	1837334	7039929	453993	2	2026-01-20 06:37:55.577
3	92	52	24233385	11000000	0	0	2348624	10884761	882714	3	2026-01-20 06:41:09.977
4	92	53	25776389	11000000	0	0	2508815	12267574	1090136	3	2026-01-20 06:41:09.989
5	92	54	10098180	11000000	0	0	854211	0	0	\N	2026-01-20 06:41:09.998
6	92	56	11797970	11000000	0	0	1033576	0	0	\N	2026-01-20 06:41:10.007
7	92	57	27006840	11000000	0	0	2612722	13394118	1259118	3	2026-01-20 06:41:10.014
8	92	58	7056222	11000000	0	0	477750	0	0	\N	2026-01-20 06:41:10.023
9	92	59	11049529	11000000	0	0	926843	0	0	\N	2026-01-20 06:41:10.03
10	92	60	15220884	11000000	0	0	1396059	2824825	141241	1	2026-01-20 06:41:10.04
11	92	63	26314216	11000000	0	0	2596754	12717462	1157619	3	2026-01-20 06:41:10.05
12	92	64	10198666	11000000	0	0	842579	0	0	\N	2026-01-20 06:41:10.06
13	92	75	13076890	11000000	0	0	1123423	953467	47673	1	2026-01-20 06:41:10.067
\.


--
-- Data for Name: bang_ung_luong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bang_ung_luong (id, ma_bang_ung_luong, thang_nam, tu_ngay, den_ngay, ngay_chi_tra, phong_ban_id, trang_thai, cau_hinh_json, tong_so_tien_ung, so_nhan_vien_ung, ghi_chu, da_ghi_nhan_khau_tru, ref_phieu_dc_id, nguoi_tao, ngay_tao, ngay_cap_nhat, nguoi_chot, ngay_chot, nguoi_khoa, ngay_khoa) FROM stdin;
86	UL2026-01-27	2026-01	2026-01-01	2026-01-15	2026-01-20	27	DA_CHOT	\N	3300000	11	Bảng ứng lương tháng 1/2026 - Chia hàng	t	25	\N	2026-01-16 04:29:24.438	2026-01-20 06:21:29.186	admin	2026-01-20 06:21:17.454	\N	\N
87	UL2026-01-32	2026-01	2026-01-01	2026-01-15	2026-01-20	32	NHAP	\N	21000000	6	Bảng ứng lương tháng 1/2026 - Giao hàng	f	\N	\N	2026-01-16 04:29:24.438	2026-01-16 04:29:24.438	\N	\N	\N	\N
88	UL2026-01-25	2026-01	2026-01-01	2026-01-15	2026-01-20	25	NHAP	\N	14000000	4	Bảng ứng lương tháng 1/2026 - Đơn hàng	f	\N	\N	2026-01-16 04:29:24.438	2026-01-16 04:29:24.438	\N	\N	\N	\N
89	UL2026-01-33	2026-01	2026-01-01	2026-01-15	2026-01-20	33	NHAP	\N	9000000	3	Bảng ứng lương tháng 1/2026 - Thu mua	f	\N	\N	2026-01-16 04:29:24.438	2026-01-16 04:29:24.438	\N	\N	\N	\N
90	UL2026-01-34	2026-01	2026-01-01	2026-01-15	2026-01-20	34	NHAP	\N	0	0	Bảng ứng lương tháng 1/2026 - Khối Văn Phòng	f	\N	\N	2026-01-16 04:29:24.438	2026-01-16 04:29:24.438	\N	\N	\N	\N
97	UL-202601-10	2026-01	2026-01-01	2026-01-15	2026-01-25	30	DA_CHOT	{"chuyen_can":{"so_ngay_nghi_toi_da":2,"cam_neu_nghi_khong_phep":true},"ung_luong":{"ti_le_toi_da":0.7,"lam_tron":10000}}	8000000	3		t	36	admin	2026-01-20 08:07:32.763	2026-01-20 08:21:17.164	admin	2026-01-20 08:21:11.447	\N	\N
1	UL6-2025-SHIP	2025-06	2025-06-01	2025-06-15	2025-06-18	29	DA_KHOA	\N	0	0	Seed data ứng lương T6/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
2	UL6-2025-KT	2025-06	2025-06-01	2025-06-15	2025-06-18	23	DA_KHOA	\N	0	0	Seed data ứng lương T6/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
3	UL6-2025-CH	2025-06	2025-06-01	2025-06-15	2025-06-18	27	DA_KHOA	\N	500000	1	Seed data ứng lương T6/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
4	UL6-2025-GIAO_HANG	2025-06	2025-06-01	2025-06-15	2025-06-18	32	DA_KHOA	\N	2400000	1	Seed data ứng lương T6/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
5	UL6-2025-DH	2025-06	2025-06-01	2025-06-15	2025-06-18	25	DA_KHOA	\N	6200000	1	Seed data ứng lương T6/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
6	UL6-2025-TM	2025-06	2025-06-01	2025-06-15	2025-06-18	33	DA_KHOA	\N	2300000	1	Seed data ứng lương T6/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
7	UL6-2025-VP	2025-06	2025-06-01	2025-06-15	2025-06-18	34	DA_KHOA	\N	0	0	Seed data ứng lương T6/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
8	UL6-2025-KV	2025-06	2025-06-01	2025-06-15	2025-06-18	26	DA_KHOA	\N	0	0	Seed data ứng lương T6/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
9	UL6-2025-KE_TOAN	2025-06	2025-06-01	2025-06-15	2025-06-18	30	DA_KHOA	\N	4800000	1	Seed data ứng lương T6/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
10	UL6-2025-MKT	2025-06	2025-06-01	2025-06-15	2025-06-18	24	DA_KHOA	\N	0	0	Seed data ứng lương T6/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
11	UL6-2025-NS	2025-06	2025-06-01	2025-06-15	2025-06-18	28	DA_KHOA	\N	0	0	Seed data ứng lương T6/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
12	UL6-2025-KINH_DOANH	2025-06	2025-06-01	2025-06-15	2025-06-18	31	DA_KHOA	\N	0	0	Seed data ứng lương T6/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
13	UL7-2025-SHIP	2025-07	2025-07-01	2025-07-15	2025-07-18	29	DA_KHOA	\N	0	0	Seed data ứng lương T7/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
14	UL7-2025-KT	2025-07	2025-07-01	2025-07-15	2025-07-18	23	DA_KHOA	\N	0	0	Seed data ứng lương T7/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
15	UL7-2025-CH	2025-07	2025-07-01	2025-07-15	2025-07-18	27	DA_KHOA	\N	16100000	6	Seed data ứng lương T7/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
16	UL7-2025-GIAO_HANG	2025-07	2025-07-01	2025-07-15	2025-07-18	32	DA_KHOA	\N	6700000	1	Seed data ứng lương T7/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
17	UL7-2025-DH	2025-07	2025-07-01	2025-07-15	2025-07-18	25	DA_KHOA	\N	0	0	Seed data ứng lương T7/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
18	UL7-2025-TM	2025-07	2025-07-01	2025-07-15	2025-07-18	33	DA_KHOA	\N	3500000	2	Seed data ứng lương T7/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
19	UL7-2025-VP	2025-07	2025-07-01	2025-07-15	2025-07-18	34	DA_KHOA	\N	0	0	Seed data ứng lương T7/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
20	UL7-2025-KV	2025-07	2025-07-01	2025-07-15	2025-07-18	26	DA_KHOA	\N	3700000	1	Seed data ứng lương T7/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
21	UL7-2025-KE_TOAN	2025-07	2025-07-01	2025-07-15	2025-07-18	30	DA_KHOA	\N	4200000	1	Seed data ứng lương T7/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
22	UL7-2025-MKT	2025-07	2025-07-01	2025-07-15	2025-07-18	24	DA_KHOA	\N	1300000	1	Seed data ứng lương T7/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
23	UL7-2025-NS	2025-07	2025-07-01	2025-07-15	2025-07-18	28	DA_KHOA	\N	0	0	Seed data ứng lương T7/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
24	UL7-2025-KINH_DOANH	2025-07	2025-07-01	2025-07-15	2025-07-18	31	DA_KHOA	\N	500000	1	Seed data ứng lương T7/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
25	UL8-2025-SHIP	2025-08	2025-08-01	2025-08-15	2025-08-18	29	DA_KHOA	\N	0	0	Seed data ứng lương T8/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
26	UL8-2025-KT	2025-08	2025-08-01	2025-08-15	2025-08-18	23	DA_KHOA	\N	0	0	Seed data ứng lương T8/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
91	UL2026-01-26	2026-01	2026-01-01	2026-01-15	2026-01-20	26	NHAP	\N	9000000	2	Bảng ứng lương tháng 1/2026 - Kho vận	f	\N	\N	2026-01-16 04:29:24.438	2026-01-16 04:29:24.438	\N	\N	\N	\N
93	UL2026-01-24	2026-01	2026-01-01	2026-01-15	2026-01-20	24	NHAP	\N	8000000	2	Bảng ứng lương tháng 1/2026 - Marketing	f	\N	\N	2026-01-16 04:29:24.438	2026-01-16 04:29:24.438	\N	\N	\N	\N
94	UL2026-01-28	2026-01	2026-01-01	2026-01-15	2026-01-20	28	NHAP	\N	0	0	Bảng ứng lương tháng 1/2026 - Nhân Sự	f	\N	\N	2026-01-16 04:29:24.438	2026-01-16 04:29:24.438	\N	\N	\N	\N
95	UL2026-01-31	2026-01	2026-01-01	2026-01-15	2026-01-20	31	NHAP	\N	9000000	2	Bảng ứng lương tháng 1/2026 - Kinh Doanh	f	\N	\N	2026-01-16 04:29:24.438	2026-01-16 04:29:24.438	\N	\N	\N	\N
28	UL8-2025-GIAO_HANG	2025-08	2025-08-01	2025-08-15	2025-08-18	32	DA_KHOA	\N	500000	1	Seed data ứng lương T8/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
29	UL8-2025-DH	2025-08	2025-08-01	2025-08-15	2025-08-18	25	DA_KHOA	\N	3500000	1	Seed data ứng lương T8/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
30	UL8-2025-TM	2025-08	2025-08-01	2025-08-15	2025-08-18	33	DA_KHOA	\N	2400000	1	Seed data ứng lương T8/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
31	UL8-2025-VP	2025-08	2025-08-01	2025-08-15	2025-08-18	34	DA_KHOA	\N	0	0	Seed data ứng lương T8/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
32	UL8-2025-KV	2025-08	2025-08-01	2025-08-15	2025-08-18	26	DA_KHOA	\N	1200000	1	Seed data ứng lương T8/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
33	UL8-2025-KE_TOAN	2025-08	2025-08-01	2025-08-15	2025-08-18	30	DA_KHOA	\N	0	0	Seed data ứng lương T8/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
34	UL8-2025-MKT	2025-08	2025-08-01	2025-08-15	2025-08-18	24	DA_KHOA	\N	500000	1	Seed data ứng lương T8/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
35	UL8-2025-NS	2025-08	2025-08-01	2025-08-15	2025-08-18	28	DA_KHOA	\N	0	0	Seed data ứng lương T8/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
36	UL8-2025-KINH_DOANH	2025-08	2025-08-01	2025-08-15	2025-08-18	31	DA_KHOA	\N	5900000	1	Seed data ứng lương T8/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
37	UL9-2025-SHIP	2025-09	2025-09-01	2025-09-15	2025-09-18	29	DA_KHOA	\N	0	0	Seed data ứng lương T9/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
38	UL9-2025-KT	2025-09	2025-09-01	2025-09-15	2025-09-18	23	DA_KHOA	\N	0	0	Seed data ứng lương T9/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
39	UL9-2025-CH	2025-09	2025-09-01	2025-09-15	2025-09-18	27	DA_KHOA	\N	7500000	2	Seed data ứng lương T9/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
40	UL9-2025-GIAO_HANG	2025-09	2025-09-01	2025-09-15	2025-09-18	32	DA_KHOA	\N	8000000	2	Seed data ứng lương T9/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
41	UL9-2025-DH	2025-09	2025-09-01	2025-09-15	2025-09-18	25	DA_KHOA	\N	9700000	3	Seed data ứng lương T9/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
42	UL9-2025-TM	2025-09	2025-09-01	2025-09-15	2025-09-18	33	DA_KHOA	\N	0	0	Seed data ứng lương T9/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
43	UL9-2025-VP	2025-09	2025-09-01	2025-09-15	2025-09-18	34	DA_KHOA	\N	0	0	Seed data ứng lương T9/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
44	UL9-2025-KV	2025-09	2025-09-01	2025-09-15	2025-09-18	26	DA_KHOA	\N	8600000	2	Seed data ứng lương T9/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
45	UL9-2025-KE_TOAN	2025-09	2025-09-01	2025-09-15	2025-09-18	30	DA_KHOA	\N	0	0	Seed data ứng lương T9/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
46	UL9-2025-MKT	2025-09	2025-09-01	2025-09-15	2025-09-18	24	DA_KHOA	\N	0	0	Seed data ứng lương T9/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
47	UL9-2025-NS	2025-09	2025-09-01	2025-09-15	2025-09-18	28	DA_KHOA	\N	0	0	Seed data ứng lương T9/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
48	UL9-2025-KINH_DOANH	2025-09	2025-09-01	2025-09-15	2025-09-18	31	DA_KHOA	\N	0	0	Seed data ứng lương T9/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
49	UL10-2025-SHIP	2025-10	2025-10-01	2025-10-15	2025-10-18	29	DA_KHOA	\N	0	0	Seed data ứng lương T10/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
50	UL10-2025-KT	2025-10	2025-10-01	2025-10-15	2025-10-18	23	DA_KHOA	\N	0	0	Seed data ứng lương T10/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
51	UL10-2025-CH	2025-10	2025-10-01	2025-10-15	2025-10-18	27	DA_KHOA	\N	8600000	3	Seed data ứng lương T10/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
52	UL10-2025-GIAO_HANG	2025-10	2025-10-01	2025-10-15	2025-10-18	32	DA_KHOA	\N	6800000	4	Seed data ứng lương T10/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
53	UL10-2025-DH	2025-10	2025-10-01	2025-10-15	2025-10-18	25	DA_KHOA	\N	0	0	Seed data ứng lương T10/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
55	UL10-2025-VP	2025-10	2025-10-01	2025-10-15	2025-10-18	34	DA_KHOA	\N	0	0	Seed data ứng lương T10/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
56	UL10-2025-KV	2025-10	2025-10-01	2025-10-15	2025-10-18	26	DA_KHOA	\N	0	0	Seed data ứng lương T10/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
57	UL10-2025-KE_TOAN	2025-10	2025-10-01	2025-10-15	2025-10-18	30	DA_KHOA	\N	3600000	1	Seed data ứng lương T10/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
58	UL10-2025-MKT	2025-10	2025-10-01	2025-10-15	2025-10-18	24	DA_KHOA	\N	4000000	1	Seed data ứng lương T10/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
59	UL10-2025-NS	2025-10	2025-10-01	2025-10-15	2025-10-18	28	DA_KHOA	\N	0	0	Seed data ứng lương T10/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
60	UL10-2025-KINH_DOANH	2025-10	2025-10-01	2025-10-15	2025-10-18	31	DA_KHOA	\N	0	0	Seed data ứng lương T10/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
61	UL11-2025-SHIP	2025-11	2025-11-01	2025-11-15	2025-11-18	29	DA_CHOT	\N	0	0	Seed data ứng lương T11/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
62	UL11-2025-KT	2025-11	2025-11-01	2025-11-15	2025-11-18	23	DA_CHOT	\N	0	0	Seed data ứng lương T11/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
63	UL11-2025-CH	2025-11	2025-11-01	2025-11-15	2025-11-18	27	DA_CHOT	\N	10200000	4	Seed data ứng lương T11/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
64	UL11-2025-GIAO_HANG	2025-11	2025-11-01	2025-11-15	2025-11-18	32	DA_CHOT	\N	2300000	1	Seed data ứng lương T11/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
65	UL11-2025-DH	2025-11	2025-11-01	2025-11-15	2025-11-18	25	DA_CHOT	\N	7400000	2	Seed data ứng lương T11/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
66	UL11-2025-TM	2025-11	2025-11-01	2025-11-15	2025-11-18	33	DA_CHOT	\N	500000	1	Seed data ứng lương T11/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
67	UL11-2025-VP	2025-11	2025-11-01	2025-11-15	2025-11-18	34	DA_CHOT	\N	0	0	Seed data ứng lương T11/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
68	UL11-2025-KV	2025-11	2025-11-01	2025-11-15	2025-11-18	26	DA_CHOT	\N	500000	1	Seed data ứng lương T11/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
69	UL11-2025-KE_TOAN	2025-11	2025-11-01	2025-11-15	2025-11-18	30	DA_CHOT	\N	2800000	2	Seed data ứng lương T11/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
70	UL11-2025-MKT	2025-11	2025-11-01	2025-11-15	2025-11-18	24	DA_CHOT	\N	500000	1	Seed data ứng lương T11/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
71	UL11-2025-NS	2025-11	2025-11-01	2025-11-15	2025-11-18	28	DA_CHOT	\N	0	0	Seed data ứng lương T11/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
72	UL11-2025-KINH_DOANH	2025-11	2025-11-01	2025-11-15	2025-11-18	31	DA_CHOT	\N	0	0	Seed data ứng lương T11/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
73	UL12-2025-SHIP	2025-12	2025-12-01	2025-12-15	2025-12-18	29	NHAP	\N	0	0	Seed data ứng lương T12/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
74	UL12-2025-KT	2025-12	2025-12-01	2025-12-15	2025-12-18	23	NHAP	\N	0	0	Seed data ứng lương T12/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
75	UL12-2025-CH	2025-12	2025-12-01	2025-12-15	2025-12-18	27	NHAP	\N	13100000	4	Seed data ứng lương T12/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
76	UL12-2025-GIAO_HANG	2025-12	2025-12-01	2025-12-15	2025-12-18	32	NHAP	\N	4100000	1	Seed data ứng lương T12/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
77	UL12-2025-DH	2025-12	2025-12-01	2025-12-15	2025-12-18	25	NHAP	\N	2600000	1	Seed data ứng lương T12/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
78	UL12-2025-TM	2025-12	2025-12-01	2025-12-15	2025-12-18	33	NHAP	\N	13900000	3	Seed data ứng lương T12/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
79	UL12-2025-VP	2025-12	2025-12-01	2025-12-15	2025-12-18	34	NHAP	\N	0	0	Seed data ứng lương T12/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
80	UL12-2025-KV	2025-12	2025-12-01	2025-12-15	2025-12-18	26	NHAP	\N	0	0	Seed data ứng lương T12/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
27	UL8-2025-CH	2025-08	2025-08-01	2025-08-15	2025-08-18	27	DA_KHOA	\N	6600000	3	Seed data ứng lương T8/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
54	UL10-2025-TM	2025-10	2025-10-01	2025-10-15	2025-10-18	33	DA_KHOA	\N	1500000	1	Seed data ứng lương T10/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
81	UL12-2025-KE_TOAN	2025-12	2025-12-01	2025-12-15	2025-12-18	30	NHAP	\N	0	0	Seed data ứng lương T12/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
82	UL12-2025-MKT	2025-12	2025-12-01	2025-12-15	2025-12-18	24	NHAP	\N	0	0	Seed data ứng lương T12/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
83	UL12-2025-NS	2025-12	2025-12-01	2025-12-15	2025-12-18	28	NHAP	\N	0	0	Seed data ứng lương T12/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
84	UL12-2025-KINH_DOANH	2025-12	2025-12-01	2025-12-15	2025-12-18	31	NHAP	\N	2200000	2	Seed data ứng lương T12/2025	f	\N	admin	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362	\N	\N	\N	\N
\.


--
-- Data for Name: bien_so_cong_thuc; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bien_so_cong_thuc (id, cong_thuc_id, ten_bien, mo_ta, kieu_du_lieu, nguon_du_lieu, gia_tri_mac_dinh, ngay_tao) FROM stdin;
\.


--
-- Data for Name: ca_lam_viec; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ca_lam_viec (id, ma_ca, ten_ca, gio_vao, gio_ra, nghi_giua_ca_phut, grace_in_phut, grace_late_phut, is_ca_dem, phong_ban_id, mo_ta, mau_hien_thi, trang_thai, tao_boi, cap_nhat_boi, ngay_tao, ngay_cap_nhat) FROM stdin;
2	CA_HANH_CHINH	Ca hành chính	08:00	17:00	60	5	5	f	\N	Ca làm việc văn phòng tiêu chuẩn	#3B82F6	t	\N	\N	2026-01-23 05:56:37.516	2026-01-23 05:56:37.516
3	CA_SANG	Ca sáng	06:00	14:00	30	5	5	f	\N	Ca sáng kho/sản xuất	#10B981	t	\N	\N	2026-01-23 05:56:37.516	2026-01-23 05:56:37.516
4	CA_CHIEU	Ca chiều	14:00	22:00	30	5	5	f	\N	Ca chiều kho/sản xuất	#F59E0B	t	\N	\N	2026-01-23 05:56:37.516	2026-01-23 05:56:37.516
5	CA_DEM	Ca đêm	22:00	06:00	30	5	5	t	\N	Ca đêm (qua ngày)	#8B5CF6	t	\N	\N	2026-01-23 05:56:37.516	2026-01-23 05:56:37.516
6	CA_GIAO_HANG	Ca giao hàng	07:00	19:00	60	10	10	f	\N	Ca giao hàng linh hoạt	#EC4899	t	\N	\N	2026-01-23 05:56:37.516	2026-01-23 05:56:37.516
7	CA_PART_SANG	Ca bán thời gian sáng	08:00	12:00	0	5	5	f	\N	Ca part-time buổi sáng	#06B6D4	t	\N	\N	2026-01-23 05:56:37.516	2026-01-23 05:56:37.516
8	CA_PART_CHIEU	Ca bán thời gian chiều	13:00	17:00	0	5	5	f	\N	Ca part-time buổi chiều	#84CC16	t	\N	\N	2026-01-23 05:56:37.516	2026-01-23 05:56:37.516
\.


--
-- Data for Name: cau_hinh_bhxh; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cau_hinh_bhxh (id, nam, ty_le_bhxh_nv, ty_le_bhxh_dn, ty_le_bhyt_nv, ty_le_bhyt_dn, ty_le_bhtn_nv, ty_le_bhtn_dn, luong_co_ban_toi_thieu, tran_dong_bhxh, luong_co_so, trang_thai, ngay_tao, ngay_cap_nhat) FROM stdin;
1	2025	8.00	17.50	1.50	3.00	1.00	1.00	4680000	46800000	2340000	t	2026-01-23 05:53:30.257	2026-01-23 05:53:30.257
2	2026	8.00	17.50	1.50	3.00	1.00	1.00	4960000	49600000	2480000	t	2026-01-23 05:53:30.257	2026-01-23 05:53:30.257
\.


--
-- Data for Name: cau_hinh_don_gia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cau_hinh_don_gia (id, ma_bien, ten_bien, mo_ta, gia_tri, don_vi, phong_ban_id, trang_thai, ngay_tao, ngay_cap_nhat) FROM stdin;
2	DON_GIA_KHOI_LUONG	Đơn giá khối lượng giao hàng	Số tiền thưởng trên mỗi đơn vị khối lượng giao hàng thành công	500.00	VND	\N	t	2026-01-15 04:29:56.712	2026-01-15 04:29:56.712
3	DON_GIA_PHAT_TRE	Đơn giá phạt trễ giờ	Số tiền phạt cho mỗi lần trễ giờ	50000.00	VND	\N	t	2026-01-15 04:29:56.716	2026-01-15 04:29:56.716
1	DON_GIA_SP	Đơn giá sản phẩm	Số tiền thưởng trên mỗi sản phẩm đạt	320.00	VND	\N	t	2026-01-15 04:29:56.708	2026-01-15 04:30:11.799
4	HE_SO_LOI_SP	Hệ số phạt lỗi sản phẩm	Hệ số nhân để tính phạt khi có sản phẩm lỗi	5.00	lần	\N	t	2026-01-15 04:29:56.719	2026-01-15 04:30:39.299
5	DON_GIA_PHAT_PHIEU	Phạt không lấy phiếu	Không lấy phiếu giao hàng về	50000.00	VND	\N	t	2026-01-15 04:51:46.691	2026-01-15 04:51:46.691
\.


--
-- Data for Name: cau_hinh_geofence; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cau_hinh_geofence (id, ten_dia_diem, dia_chi, vi_do, kinh_do, ban_kinh_met, phong_ban_id, ap_dung_tat_ca, bat_buoc_gps, chan_ngoai_vung, trang_thai, tao_boi, cap_nhat_boi, ngay_tao, ngay_cap_nhat) FROM stdin;
\.


--
-- Data for Name: cau_hinh_import_phong_ban; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cau_hinh_import_phong_ban (id, phong_ban_id, loai_import, bat_buoc_don_vi_con, gioi_han_so_dong, trang_thai, ngay_tao) FROM stdin;
\.


--
-- Data for Name: cau_hinh_phat_cham_cong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cau_hinh_phat_cham_cong (id, nam, phat_di_muon_1_3_lan, phat_di_muon_4_6_lan, phat_di_muon_tren_6_lan, phat_ve_som_1_3_lan, phat_ve_som_4_6_lan, phat_ve_som_tren_6_lan, phat_nghi_khong_phep, tru_luong_nghi_khong_phep, gio_vao_chuan, gio_ra_chuan, phut_cho_phep_tre, mo_ta, ngay_tao, ngay_cap_nhat) FROM stdin;
\.


--
-- Data for Name: cau_hinh_thue_tncn; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cau_hinh_thue_tncn (id, nam, giam_tru_ban_than, giam_tru_phu_thuoc, trang_thai, ngay_tao, ngay_cap_nhat) FROM stdin;
1	2025	11000000	4400000	t	2026-01-23 05:53:30.257	2026-01-23 05:53:30.257
2	2026	11000000	4400000	t	2026-01-23 05:53:30.257	2026-01-23 05:53:30.257
\.


--
-- Data for Name: cau_hinh_thuong_kpi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cau_hinh_thuong_kpi (id, nam, xep_loai, diem_toi_thieu, diem_toi_da, he_so_thuong, mo_ta, trang_thai, ngay_tao) FROM stdin;
\.


--
-- Data for Name: cham_cong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cham_cong (id, nhan_vien_id, thang, nam, so_cong_chuan, so_cong_thuc_te, so_ngay_nghi_phep, so_ngay_nghi_khong_luong, so_gio_ot, so_gio_ot_dem, so_gio_ot_chu_nhat, so_gio_ot_le, so_lan_di_muon, so_lan_ve_som, ghi_chu, ngay_tao, ngay_cap_nhat) FROM stdin;
1	40	6	2025	26.0	26.0	0.0	0.0	2.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
2	42	6	2025	26.0	26.0	0.0	0.0	2.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
3	44	6	2025	26.0	26.0	0.0	0.0	6.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
4	45	6	2025	26.0	26.0	0.0	0.0	4.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
5	46	6	2025	26.0	26.0	0.0	0.0	9.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
6	47	6	2025	26.0	26.0	0.0	0.0	8.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
7	48	6	2025	26.0	26.0	0.0	0.0	9.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
8	49	6	2025	26.0	26.0	0.0	0.0	0.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
9	50	6	2025	26.0	26.0	0.0	0.0	7.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
10	52	6	2025	26.0	26.0	0.0	0.0	3.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
11	53	6	2025	26.0	26.0	0.0	0.0	5.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
12	54	6	2025	26.0	24.0	1.0	1.0	1.0	0.0	0.0	0.0	4	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
13	55	6	2025	26.0	26.0	0.0	0.0	2.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
14	56	6	2025	26.0	26.0	0.0	0.0	9.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
15	57	6	2025	26.0	26.0	0.0	0.0	8.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
16	58	6	2025	26.0	26.0	0.0	0.0	3.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
17	59	6	2025	26.0	26.0	0.0	0.0	1.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
18	60	6	2025	26.0	26.0	0.0	0.0	8.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
19	63	6	2025	26.0	26.0	0.0	0.0	6.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
20	64	6	2025	26.0	26.0	0.0	0.0	8.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
21	65	6	2025	26.0	25.0	1.0	0.0	5.0	0.0	0.0	0.0	3	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
22	66	6	2025	26.0	26.0	0.0	0.0	9.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
23	67	6	2025	26.0	26.0	0.0	0.0	3.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
24	68	6	2025	26.0	26.0	0.0	0.0	9.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
25	69	6	2025	26.0	26.0	0.0	0.0	9.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
26	70	6	2025	26.0	26.0	0.0	0.0	6.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
27	71	6	2025	26.0	23.0	2.0	1.0	6.0	0.0	0.0	0.0	3	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
28	72	6	2025	26.0	26.0	0.0	0.0	5.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
29	73	6	2025	26.0	26.0	0.0	0.0	8.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
30	74	6	2025	26.0	26.0	0.0	0.0	2.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
31	75	6	2025	26.0	24.0	2.0	0.0	2.0	0.0	0.0	0.0	3	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
32	76	6	2025	26.0	24.0	2.0	0.0	5.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
33	77	6	2025	26.0	26.0	0.0	0.0	4.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
34	40	7	2025	26.0	26.0	0.0	0.0	1.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
35	42	7	2025	26.0	26.0	0.0	0.0	7.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
36	44	7	2025	26.0	26.0	0.0	0.0	7.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
37	45	7	2025	26.0	26.0	0.0	0.0	7.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
38	46	7	2025	26.0	26.0	0.0	0.0	2.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
39	47	7	2025	26.0	26.0	0.0	0.0	7.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
40	48	7	2025	26.0	25.0	1.0	0.0	9.0	0.0	0.0	0.0	3	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
41	49	7	2025	26.0	26.0	0.0	0.0	3.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
42	50	7	2025	26.0	26.0	0.0	0.0	5.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
43	52	7	2025	26.0	24.0	2.0	0.0	5.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
44	53	7	2025	26.0	26.0	0.0	0.0	5.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
45	54	7	2025	26.0	26.0	0.0	0.0	6.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
46	55	7	2025	26.0	26.0	0.0	0.0	2.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
47	56	7	2025	26.0	24.0	1.0	1.0	7.0	0.0	0.0	0.0	3	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
48	57	7	2025	26.0	25.0	1.0	0.0	7.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
49	58	7	2025	26.0	26.0	0.0	0.0	8.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
50	59	7	2025	26.0	26.0	0.0	0.0	0.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
51	60	7	2025	26.0	26.0	0.0	0.0	8.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
52	63	7	2025	26.0	26.0	0.0	0.0	4.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
53	64	7	2025	26.0	26.0	0.0	0.0	2.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
54	65	7	2025	26.0	25.0	1.0	0.0	7.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
55	66	7	2025	26.0	25.0	1.0	0.0	7.0	0.0	0.0	0.0	3	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
56	67	7	2025	26.0	26.0	0.0	0.0	6.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
57	68	7	2025	26.0	24.0	2.0	0.0	5.0	0.0	0.0	0.0	3	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
58	69	7	2025	26.0	26.0	0.0	0.0	0.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
59	70	7	2025	26.0	26.0	0.0	0.0	5.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
60	71	7	2025	26.0	25.0	1.0	0.0	0.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
61	72	7	2025	26.0	23.0	1.0	2.0	5.0	0.0	0.0	0.0	3	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
62	73	7	2025	26.0	26.0	0.0	0.0	4.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
63	74	7	2025	26.0	26.0	0.0	0.0	2.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
64	75	7	2025	26.0	26.0	0.0	0.0	1.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
65	76	7	2025	26.0	26.0	0.0	0.0	2.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
66	77	7	2025	26.0	26.0	0.0	0.0	8.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
67	40	8	2025	26.0	23.0	2.0	1.0	8.0	0.0	0.0	0.0	5	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
68	42	8	2025	26.0	26.0	0.0	0.0	0.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
69	44	8	2025	26.0	26.0	0.0	0.0	9.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
70	45	8	2025	26.0	26.0	0.0	0.0	2.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
71	46	8	2025	26.0	25.0	1.0	0.0	1.0	0.0	0.0	0.0	3	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
72	47	8	2025	26.0	26.0	0.0	0.0	3.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
73	48	8	2025	26.0	26.0	0.0	0.0	8.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
74	49	8	2025	26.0	26.0	0.0	0.0	6.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
75	50	8	2025	26.0	26.0	0.0	0.0	1.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
76	52	8	2025	26.0	24.0	2.0	0.0	8.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
77	53	8	2025	26.0	26.0	0.0	0.0	8.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
78	54	8	2025	26.0	24.0	2.0	0.0	3.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
79	55	8	2025	26.0	22.0	2.0	2.0	3.0	0.0	0.0	0.0	3	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
80	56	8	2025	26.0	24.0	2.0	0.0	2.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
81	57	8	2025	26.0	26.0	0.0	0.0	2.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
82	58	8	2025	26.0	26.0	0.0	0.0	4.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
83	59	8	2025	26.0	23.0	1.0	2.0	8.0	0.0	0.0	0.0	3	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
84	60	8	2025	26.0	26.0	0.0	0.0	0.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
85	63	8	2025	26.0	25.0	1.0	0.0	9.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
86	64	8	2025	26.0	26.0	0.0	0.0	6.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
87	65	8	2025	26.0	26.0	0.0	0.0	6.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
88	66	8	2025	26.0	25.0	1.0	0.0	0.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
89	67	8	2025	26.0	26.0	0.0	0.0	9.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
90	68	8	2025	26.0	26.0	0.0	0.0	1.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
91	69	8	2025	26.0	24.0	2.0	0.0	5.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
92	70	8	2025	26.0	22.0	2.0	2.0	5.0	0.0	0.0	0.0	4	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
93	71	8	2025	26.0	26.0	0.0	0.0	1.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
94	72	8	2025	26.0	26.0	0.0	0.0	8.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
95	73	8	2025	26.0	25.0	1.0	0.0	2.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
96	74	8	2025	26.0	26.0	0.0	0.0	2.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
97	75	8	2025	26.0	26.0	0.0	0.0	7.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
98	76	8	2025	26.0	26.0	0.0	0.0	3.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
99	77	8	2025	26.0	26.0	0.0	0.0	5.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
100	40	9	2025	26.0	24.0	2.0	0.0	4.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
101	42	9	2025	26.0	24.0	2.0	0.0	6.0	0.0	0.0	0.0	3	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
102	44	9	2025	26.0	24.0	1.0	1.0	4.0	0.0	0.0	0.0	3	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
103	45	9	2025	26.0	26.0	0.0	0.0	0.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
104	46	9	2025	26.0	26.0	0.0	0.0	5.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
105	47	9	2025	26.0	26.0	0.0	0.0	3.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
106	48	9	2025	26.0	26.0	0.0	0.0	2.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
107	49	9	2025	26.0	26.0	0.0	0.0	2.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
108	50	9	2025	26.0	26.0	0.0	0.0	3.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
109	52	9	2025	26.0	26.0	0.0	0.0	5.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
110	53	9	2025	26.0	26.0	0.0	0.0	1.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
111	54	9	2025	26.0	26.0	0.0	0.0	1.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
112	55	9	2025	26.0	26.0	0.0	0.0	0.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
113	56	9	2025	26.0	26.0	0.0	0.0	7.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
114	57	9	2025	26.0	25.0	1.0	0.0	3.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
115	58	9	2025	26.0	23.0	2.0	1.0	3.0	0.0	0.0	0.0	3	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
116	59	9	2025	26.0	26.0	0.0	0.0	3.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
117	60	9	2025	26.0	26.0	0.0	0.0	0.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
118	63	9	2025	26.0	26.0	0.0	0.0	9.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
119	64	9	2025	26.0	26.0	0.0	0.0	8.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
120	65	9	2025	26.0	26.0	0.0	0.0	0.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
121	66	9	2025	26.0	26.0	0.0	0.0	0.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
122	67	9	2025	26.0	26.0	0.0	0.0	1.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
123	68	9	2025	26.0	26.0	0.0	0.0	4.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
124	69	9	2025	26.0	26.0	0.0	0.0	3.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
125	70	9	2025	26.0	25.0	1.0	0.0	6.0	0.0	0.0	0.0	3	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
126	71	9	2025	26.0	26.0	0.0	0.0	8.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
127	72	9	2025	26.0	26.0	0.0	0.0	6.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
128	73	9	2025	26.0	26.0	0.0	0.0	5.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
129	74	9	2025	26.0	26.0	0.0	0.0	6.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
130	75	9	2025	26.0	24.0	2.0	0.0	4.0	0.0	0.0	0.0	3	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
131	76	9	2025	26.0	26.0	0.0	0.0	4.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
132	77	9	2025	26.0	26.0	0.0	0.0	4.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
133	40	10	2025	26.0	26.0	0.0	0.0	6.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
134	42	10	2025	26.0	26.0	0.0	0.0	3.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
135	44	10	2025	26.0	26.0	0.0	0.0	8.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
136	45	10	2025	26.0	26.0	0.0	0.0	2.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
137	46	10	2025	26.0	24.0	2.0	0.0	1.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
138	47	10	2025	26.0	24.0	2.0	0.0	0.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
139	48	10	2025	26.0	26.0	0.0	0.0	0.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
140	49	10	2025	26.0	26.0	0.0	0.0	2.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
141	50	10	2025	26.0	24.0	1.0	1.0	8.0	0.0	0.0	0.0	3	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
142	52	10	2025	26.0	26.0	0.0	0.0	9.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
143	53	10	2025	26.0	26.0	0.0	0.0	7.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
144	54	10	2025	26.0	22.0	2.0	2.0	5.0	0.0	0.0	0.0	4	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
145	55	10	2025	26.0	24.0	2.0	0.0	7.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
146	56	10	2025	26.0	25.0	1.0	0.0	3.0	0.0	0.0	0.0	3	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
147	57	10	2025	26.0	26.0	0.0	0.0	2.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
148	58	10	2025	26.0	26.0	0.0	0.0	1.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
149	59	10	2025	26.0	26.0	0.0	0.0	0.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
150	60	10	2025	26.0	26.0	0.0	0.0	3.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
151	63	10	2025	26.0	23.0	1.0	2.0	3.0	0.0	0.0	0.0	5	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
152	64	10	2025	26.0	26.0	0.0	0.0	8.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
153	65	10	2025	26.0	26.0	0.0	0.0	9.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
154	66	10	2025	26.0	24.0	2.0	0.0	7.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
155	67	10	2025	26.0	24.0	1.0	1.0	3.0	0.0	0.0	0.0	4	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
156	68	10	2025	26.0	25.0	1.0	0.0	1.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
157	69	10	2025	26.0	26.0	0.0	0.0	3.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
158	70	10	2025	26.0	26.0	0.0	0.0	9.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
159	71	10	2025	26.0	25.0	1.0	0.0	3.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
160	72	10	2025	26.0	26.0	0.0	0.0	9.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
161	73	10	2025	26.0	26.0	0.0	0.0	6.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
162	74	10	2025	26.0	23.0	2.0	1.0	4.0	0.0	0.0	0.0	4	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
163	75	10	2025	26.0	24.0	2.0	0.0	4.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
164	76	10	2025	26.0	26.0	0.0	0.0	3.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
165	77	10	2025	26.0	26.0	0.0	0.0	8.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
166	40	11	2025	26.0	25.0	1.0	0.0	8.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
167	42	11	2025	26.0	26.0	0.0	0.0	8.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
168	44	11	2025	26.0	25.0	1.0	0.0	2.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
169	45	11	2025	26.0	26.0	0.0	0.0	1.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
170	46	11	2025	26.0	26.0	0.0	0.0	7.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
171	47	11	2025	26.0	26.0	0.0	0.0	2.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
172	48	11	2025	26.0	24.0	1.0	1.0	7.0	0.0	0.0	0.0	3	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
173	49	11	2025	26.0	26.0	0.0	0.0	4.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
174	50	11	2025	26.0	25.0	1.0	0.0	4.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
175	52	11	2025	26.0	25.0	1.0	0.0	6.0	0.0	0.0	0.0	3	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
176	53	11	2025	26.0	26.0	0.0	0.0	6.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
177	54	11	2025	26.0	26.0	0.0	0.0	2.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
178	55	11	2025	26.0	26.0	0.0	0.0	1.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
179	56	11	2025	26.0	26.0	0.0	0.0	5.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
180	57	11	2025	26.0	26.0	0.0	0.0	6.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
181	58	11	2025	26.0	24.0	2.0	0.0	0.0	0.0	0.0	0.0	3	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
182	59	11	2025	26.0	26.0	0.0	0.0	9.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
183	60	11	2025	26.0	26.0	0.0	0.0	5.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
184	63	11	2025	26.0	26.0	0.0	0.0	2.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
185	64	11	2025	26.0	26.0	0.0	0.0	0.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
186	65	11	2025	26.0	25.0	1.0	0.0	9.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
187	66	11	2025	26.0	26.0	0.0	0.0	4.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
188	67	11	2025	26.0	26.0	0.0	0.0	6.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
189	68	11	2025	26.0	26.0	0.0	0.0	4.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
190	69	11	2025	26.0	24.0	1.0	1.0	7.0	0.0	0.0	0.0	3	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
191	70	11	2025	26.0	24.0	2.0	0.0	9.0	0.0	0.0	0.0	3	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
192	71	11	2025	26.0	26.0	0.0	0.0	9.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
193	72	11	2025	26.0	25.0	1.0	0.0	3.0	0.0	0.0	0.0	3	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
194	73	11	2025	26.0	26.0	0.0	0.0	7.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
195	74	11	2025	26.0	26.0	0.0	0.0	3.0	0.0	0.0	0.0	1	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
196	75	11	2025	26.0	26.0	0.0	0.0	1.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
197	76	11	2025	26.0	26.0	0.0	0.0	3.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
198	77	11	2025	26.0	26.0	0.0	0.0	6.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
199	40	12	2025	26.0	26.0	0.0	0.0	8.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
200	42	12	2025	26.0	26.0	0.0	0.0	7.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
201	44	12	2025	26.0	26.0	0.0	0.0	2.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
202	45	12	2025	26.0	26.0	0.0	0.0	0.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
203	46	12	2025	26.0	26.0	0.0	0.0	3.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
204	47	12	2025	26.0	26.0	0.0	0.0	3.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
205	48	12	2025	26.0	25.0	1.0	0.0	9.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
206	49	12	2025	26.0	26.0	0.0	0.0	1.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
207	50	12	2025	26.0	24.0	2.0	0.0	5.0	0.0	0.0	0.0	3	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
208	52	12	2025	26.0	25.0	1.0	0.0	3.0	0.0	0.0	0.0	3	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
209	53	12	2025	26.0	22.0	2.0	2.0	2.0	0.0	0.0	0.0	4	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
210	54	12	2025	26.0	26.0	0.0	0.0	4.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
211	55	12	2025	26.0	22.0	2.0	2.0	0.0	0.0	0.0	0.0	5	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
212	56	12	2025	26.0	26.0	0.0	0.0	3.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
213	57	12	2025	26.0	26.0	0.0	0.0	0.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
214	58	12	2025	26.0	26.0	0.0	0.0	5.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
215	59	12	2025	26.0	26.0	0.0	0.0	0.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
216	60	12	2025	26.0	25.0	1.0	0.0	4.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
217	63	12	2025	26.0	26.0	0.0	0.0	8.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
218	64	12	2025	26.0	25.0	1.0	0.0	5.0	0.0	0.0	0.0	3	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
219	65	12	2025	26.0	26.0	0.0	0.0	8.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
220	66	12	2025	26.0	26.0	0.0	0.0	8.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
221	67	12	2025	26.0	26.0	0.0	0.0	4.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
222	68	12	2025	26.0	26.0	0.0	0.0	3.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
223	69	12	2025	26.0	26.0	0.0	0.0	8.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
224	70	12	2025	26.0	26.0	0.0	0.0	7.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
225	71	12	2025	26.0	26.0	0.0	0.0	5.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
226	72	12	2025	26.0	25.0	1.0	0.0	6.0	0.0	0.0	0.0	2	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
227	73	12	2025	26.0	26.0	0.0	0.0	8.0	0.0	0.0	0.0	1	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
228	74	12	2025	26.0	26.0	0.0	0.0	4.0	0.0	0.0	0.0	2	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
229	75	12	2025	26.0	26.0	0.0	0.0	1.0	0.0	0.0	0.0	0	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
230	76	12	2025	26.0	24.0	2.0	0.0	7.0	0.0	0.0	0.0	3	0	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
231	77	12	2025	26.0	26.0	0.0	0.0	3.0	0.0	0.0	0.0	0	1	Seed data	2026-01-16 03:34:00.537	2026-01-16 03:34:00.537
\.


--
-- Data for Name: chat_analytics; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chat_analytics (id, query, sources_count, user_id, session_id, feedback, created_at) FROM stdin;
1	Làm sao tạo bảng lương?	5	\N	e81a7619-4e4f-469c-ab24-3b8aa21adda8	\N	2026-01-23 03:47:10.156
2	Snapshot là gì?	5	\N	98fc9096-dfc9-4e25-9da0-42cf84c2a033	\N	2026-01-23 03:47:10.179
3	Quy chế lương hoạt động thế nào?	5	\N	5f7dcd21-b867-4258-b087-ae10c01d7d7c	\N	2026-01-23 03:47:10.206
4	Import nhân viên từ Excel?	5	\N	78225b85-b716-4a9b-b567-8bfcb955bf04	\N	2026-01-23 03:47:10.231
5	Chốt và khóa khác nhau thế nào?	5	\N	79b09cdb-4c05-4826-952e-cb422fb69ea2	\N	2026-01-23 03:47:10.259
6	test	0	\N	613db0cd-0c35-4bbb-af55-66526a854a36	\N	2026-01-23 03:56:19.571
7	lập bảng lương thế nào?	5	\N	65bdc8a1-efde-43a3-86de-a475f9875ab5	\N	2026-01-23 04:00:51.547
8	tạo ứng lương	5	\N	54f485d9-3bbb-47ff-a015-04b6a5ca55df	\N	2026-01-23 04:06:24.305
9	tạo ứng lương như thế nào?	5	\N	8502d233-ada9-4da8-b867-aaeea6b91f5e	\N	2026-01-23 04:11:22.611
10	tạo ứng lương	5	\N	a7d1077b-7232-44f7-82e7-7be8995dcbb3	\N	2026-01-23 04:14:49.975
11	làm sao tạo bảng ứng lương	5	\N	a18f7571-05a1-487c-8c5f-7a9194147267	\N	2026-01-23 04:14:56.937
12	cách tạo ứng lương	5	\N	8658425e-3a82-4f5c-a76c-8a0249d02ce1	\N	2026-01-23 04:16:21.112
13	cách tạo ứng lương?	5	\N	c50b9553-9dc8-435b-a432-cf95b3deca1d	\N	2026-01-23 04:19:12.938
14	tạo ứng lương	5	\N	64a72b50-801c-498a-9c26-e4e84480bff5	\N	2026-01-23 04:19:20.781
15	làm bảng lương	5	\N	43e4a29a-1f49-4d66-81bd-1295c5220291	\N	2026-01-23 04:19:20.824
16	thêm nhân viên	5	\N	1d76ffe4-e593-45e0-bd92-827276134b29	\N	2026-01-23 04:19:20.87
17	tạo bảng ứng lương	5	\N	e60930b7-5bf1-4821-aa1b-23dba44e7916	\N	2026-01-23 04:21:49.573
18	chốt bảng ứng lương?	5	\N	44ac057c-f0b6-4ba5-8b82-cae3380fe523	\N	2026-01-23 04:22:08.616
19	chốt ứng lương thế nào?	5	\N	eafa7d0d-7458-4fa0-a328-dccab6e23fc9	\N	2026-01-23 04:32:40.537
20	ghi nhận khấu trừ thế nào?	5	\N	e74368ee-321f-4f08-b76c-c789c0532650	\N	2026-01-23 04:39:41.902
21	hướng dẫn về Bảng lương	5	\N	ba03a40b-cfc7-4f9c-82b5-0af020279ed5	\N	2026-01-23 04:41:50.582
22	Làm sao tạo bảng lương mới?	5	\N	4134e63d-5577-4f00-baea-1e271baf49a6	\N	2026-01-23 04:41:54.992
23	Snapshot là gì?	5	\N	27fe0cd9-1ae9-4149-9b8c-5ab8268fab93	\N	2026-01-23 04:41:58.823
\.


--
-- Data for Name: chat_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chat_history (id, session_id, user_id, role, content, created_at) FROM stdin;
1	e81a7619-4e4f-469c-ab24-3b8aa21adda8	\N	user	Làm sao tạo bảng lương?	2026-01-23 03:47:10.151
2	e81a7619-4e4f-469c-ab24-3b8aa21adda8	\N	assistant	**Làm sao điều chỉnh lương sau khi đã chốt?**\n\n### Làm sao điều chỉnh lương sau khi đã chốt?\n\nSử dụng **Adjustment Voucher**:\n\n1. Mở bảng lương đã chốt\n2. Click **Tạo Adjustment**\n3. Chọn nhân viên cần điều chỉnh\n4. Chọn khoản lương\n5. Nhập số tiền điều chỉnh (+/-)\n6. Ghi lý do\n7. Xác nhận\n\nAdjustment được ghi nhận riêng và không thay đổi bản chốt gốc.\n\n**Tags:** `payroll`, `adjustment`, `lock`\n\n---\n\n	2026-01-23 03:47:10.154
3	98fc9096-dfc9-4e25-9da0-42cf84c2a033	\N	user	Snapshot là gì?	2026-01-23 03:47:10.176
4	98fc9096-dfc9-4e25-9da0-42cf84c2a033	\N	assistant	**Snapshot là gì? Khi nào cần tạo?**\n\n### Snapshot là gì? Khi nào cần tạo?\n\n**Snapshot** là bản chụp trạng thái bảng lương.\n\nNên tạo snapshot khi:\n- Trước khi chốt kỳ lương\n- Sau mỗi lần điều chỉnh quan trọng\n- Để so sánh các phiên bản\n\nCách tạo:\n1. Mở chi tiết bảng lương\n2. Click **Tạo Snapshot**\n3. Nhập ghi chú (tùy chọn)\n4. Xác nhận\n\n**Tags:** `payroll`, `snapshot`\n\n---\n\n...	2026-01-23 03:47:10.178
5	5f7dcd21-b867-4258-b087-ae10c01d7d7c	\N	user	Quy chế lương hoạt động thế nào?	2026-01-23 03:47:10.203
6	5f7dcd21-b867-4258-b087-ae10c01d7d7c	\N	assistant	Dựa trên tài liệu "Tạo bảng lương tháng như thế nào?":\n\n### Tạo bảng lương tháng như thế nào?\n\n1. Truy cập **Bảng Lương > Danh Sách**\n2. Click **Tạo Bảng Lương Mới**\n3. Chọn tháng/năm\n4. Chọn phòng ban (hoặc Tất cả)\n5. Hệ thống tự động tính toán dựa trên:\n   - Quy chế lương đang hiệu lực\n   - Dữ liệu chấm công\n   - Dữ liệu sản lượng (nếu có)\n6. Kiểm tra và chốt khi hoàn tất\n\n**Tags:** `payroll`, `calculation`, `bang_luong`\n\n---\n\n...	2026-01-23 03:47:10.205
7	78225b85-b716-4a9b-b567-8bfcb955bf04	\N	user	Import nhân viên từ Excel?	2026-01-23 03:47:10.228
8	78225b85-b716-4a9b-b567-8bfcb955bf04	\N	assistant	Dựa trên tài liệu "Import nhân viên từ Excel như thế nào?":\n\n### Import nhân viên từ Excel như thế nào?\n\n1. Truy cập **Nhân Viên > Import/Export**\n2. Click **Tải file mẫu** để lấy template\n3. Điền thông tin nhân viên vào file Excel\n4. Click **Chọn file** và upload file đã điền\n5. Map các cột dữ liệu\n6. Click **Import** và kiểm tra kết quả\n\n**Tags:** `setup`, `import`, `employees`\n\n---\n\n...	2026-01-23 03:47:10.23
9	79b09cdb-4c05-4826-952e-cb422fb69ea2	\N	user	Chốt và khóa khác nhau thế nào?	2026-01-23 03:47:10.255
10	79b09cdb-4c05-4826-952e-cb422fb69ea2	\N	assistant	Dựa trên tài liệu "Chốt và Khóa bảng lương khác nhau thế nào?":\n\n### Chốt và Khóa bảng lương khác nhau thế nào?\n\n| Trạng thái | Mô tả | Có thể điều chỉnh? | |------------|-------|-------------------| | **NHAP** | Đang soạn thảo | ✅ Có | | **DA_CHOT** | Đã chốt | ⚠️ Chỉ qua Adjustment | | **DA_KHOA** | Khóa vĩnh viễn | ❌ Không |\n\nQuy trình: NHAP → Chốt → DA_CHOT → (Adjustment nếu cần) → Khóa → DA_KHOA\n\n**Tags:** `payroll`, `snapshot`, `lock`\n\n---\n\n...	2026-01-23 03:47:10.257
11	613db0cd-0c35-4bbb-af55-66526a854a36	\N	user	test	2026-01-23 03:56:19.567
12	613db0cd-0c35-4bbb-af55-66526a854a36	\N	assistant	Xin lỗi, tôi không tìm thấy thông tin liên quan đến câu hỏi của bạn trong hệ thống. Vui lòng thử diễn đạt lại hoặc liên hệ bộ phận hỗ trợ.	2026-01-23 03:56:19.569
13	65bdc8a1-efde-43a3-86de-a475f9875ab5	\N	user	lập bảng lương thế nào?	2026-01-23 04:00:51.543
14	65bdc8a1-efde-43a3-86de-a475f9875ab5	\N	assistant	Dựa trên tài liệu "Thiết lập khoản lương như thế nào?":\n\n### Thiết lập khoản lương như thế nào?\n\n1. Truy cập **Bảng Lương > Khoản Lương**\n2. Click **Thêm mới**\n3. Nhập tên khoản lương\n4. Chọn loại: THU_NHAP hoặc KHAU_TRU\n5. Chọn có bắt buộc hay không\n6. Click **Lưu**\n\nKhoản lương phổ biến:\n- THU_NHAP: Lương cơ bản, Phụ cấp, Thưởng\n- KHAU_TRU: BHXH, Thuế TNCN, Tạm ứng\n\n**Tags:** `setup`, `payroll`, `khoan_luong`\n\n---\n\n...	2026-01-23 04:00:51.545
15	54f485d9-3bbb-47ff-a015-04b6a5ca55df	\N	user	tạo ứng lương	2026-01-23 04:06:24.297
16	54f485d9-3bbb-47ff-a015-04b6a5ca55df	\N	assistant	Dựa trên tài liệu "Bước 3: Thiết Lập Khoản Lương":\n\n### Bước 3: Thiết Lập Khoản Lương\n\n1. Truy cập **Bảng Lương > Khoản Lương**\n2. Tạo các khoản thu nhập:\n   - Lương cơ bản\n   - Phụ cấp (ăn trưa, đi lại, điện thoại...)\n   - Thưởng KPI\n3. Tạo các khoản khấu trừ:\n   - BHXH, BHYT, BHTN\n   - Thuế TNCN\n   - Tạm ứng\n\n...	2026-01-23 04:06:24.302
17	8502d233-ada9-4da8-b867-aaeea6b91f5e	\N	user	tạo ứng lương như thế nào?	2026-01-23 04:11:22.596
18	8502d233-ada9-4da8-b867-aaeea6b91f5e	\N	assistant	**Sprint 4: Glossary & FAQ Generation (1 ngày)**\n\n### Sprint 4: Glossary & FAQ Generation (1 ngày)\n\n#### Task 4.1: Glossary Extraction\nThuật ngữ bắt buộc (từ prompt + hệ thống):\n\n| Term | Category |\n|------|----------|\n| Snapshot | Payroll |\n| Chốt kỳ / Khoá kỳ | Payroll |\n| Rule Engine / Rule Trace | Payroll |\n| Adjustment Voucher | Payroll |\n| Ngày công / Công chuẩn | Attendance |\n| KPI Mapping | KPI |\n| Ứng lương | Payroll |\n| Phụ cấp theo nhân viên | Payroll |\n| Sản lượng / Chia hàng / Giao hàng | Import |\n| BHXH / BHYT / BHTN | Tax |\n| Thuế TNCN | Tax |\n| RBAC / Vai trò | System |\n\n#### Task 4.2: FAQ Generation\nNhóm FAQ theo workflow:\n\n1. **Setup**\n   - Làm sao tạo phòng ban mới?\n   - Import nhân viên từ Excel như thế nào?\n   \n2. **Tính lương**\n   - Tạo bảng lương tháng như thế nào?\n   - Công thức tính sản lượng hoạt động ra sao?\n   \n3. **Snapshot/Chốt**\n   - Snapshot là gì? Khi nào cần tạo?\n   - Chốt và Khoá khác nhau thế nào?\n   \n4. **Lỗi thường gặp**\n   - Lương tính sai, kiểm tra ở đâu?\n   - Import lỗi "Mã NV không tồn tại"?\n\n---	2026-01-23 04:11:22.605
19	a7d1077b-7232-44f7-82e7-7be8995dcbb3	\N	user	tạo ứng lương	2026-01-23 04:14:49.964
20	a7d1077b-7232-44f7-82e7-7be8995dcbb3	\N	assistant	Dựa trên tài liệu "Menu Chính":\n\n## Menu Chính\n\nHệ thống HRM Lite có các menu chính sau:\n\n| Menu | Đường dẫn | Mô tả |\n|------|-----------|-------|\n| Trang chủ | `/` | Dashboard tổng quan |\n| Bảng Lương | `/bang-luong` | Quản lý bảng lương theo kỳ |\n| Nhân Viên | `/nhan-vien` | Quản lý thông tin nhân viên |\n| Phòng Ban | `/phong-ban` | Cơ cấu tổ chức |\n| Khoản Lương | `/khoan-luong` | Danh mục các khoản lương |\n| Chấm Công | `/cham-cong` | Quản lý chấm công |\n| Ứng Lương | `/ung-luong` | Quản lý tạm ứng lương |\n| Quy Chế | `/quy-che` | Rule Engine - Quy chế tính lương |\n| Nghỉ Phép | `/nghi-phep/don-cua-toi` | Quản lý nghỉ phép |\n\n---...	2026-01-23 04:14:49.971
21	a18f7571-05a1-487c-8c5f-7a9194147267	\N	user	làm sao tạo bảng ứng lương	2026-01-23 04:14:56.927
22	a18f7571-05a1-487c-8c5f-7a9194147267	\N	assistant	**Làm sao tạo bảng ứng lương?**\n\n### Làm sao tạo bảng ứng lương?\n\n1. Truy cập menu **Ứng Lương** (đường dẫn `/ung-luong`)\n2. Click nút **Tạo Bảng Ứng Lương**\n3. Chọn:\n   - Kỳ lương (tháng/năm)\n   - Phòng ban (hoặc tất cả)\n4. Click **Tạo**\n5. Hệ thống tạo danh sách nhân viên\n6. Nhập số tiền ứng cho từng người hoặc theo tỷ lệ %	2026-01-23 04:14:56.934
23	8658425e-3a82-4f5c-a76c-8a0249d02ce1	\N	user	cách tạo ứng lương	2026-01-23 04:16:21.106
24	8658425e-3a82-4f5c-a76c-8a0249d02ce1	\N	assistant	**Menu Chính**\n\n## Menu Chính\n\nHệ thống HRM Lite có các menu chính sau:\n\n| Menu | Đường dẫn | Mô tả |\n|------|-----------|-------|\n| Trang chủ | `/` | Dashboard tổng quan |\n| Bảng Lương | `/bang-luong` | Quản lý bảng lương theo kỳ |\n| Nhân Viên | `/nhan-vien` | Quản lý thông tin nhân viên |\n| Phòng Ban | `/phong-ban` | Cơ cấu tổ chức |\n| Khoản Lương | `/khoan-luong` | Danh mục các khoản lương |\n| Chấm Công | `/cham-cong` | Quản lý chấm công |\n| Ứng Lương | `/ung-luong` | Quản lý tạm ứng lương |\n| Quy Chế | `/quy-che` | Rule Engine - Quy chế tính lương |\n| Nghỉ Phép | `/nghi-phep/don-cua-toi` | Quản lý nghỉ phép |\n\n---	2026-01-23 04:16:21.109
25	c50b9553-9dc8-435b-a432-cf95b3deca1d	\N	user	cách tạo ứng lương?	2026-01-23 04:19:12.927
26	c50b9553-9dc8-435b-a432-cf95b3deca1d	\N	assistant	**Làm sao tạo bảng ứng lương?**\n\n### Làm sao tạo bảng ứng lương?\n\n1. Truy cập menu **Ứng Lương** (đường dẫn `/ung-luong`)\n2. Click nút **Tạo Bảng Ứng Lương**\n3. Chọn:\n   - Kỳ lương (tháng/năm)\n   - Phòng ban (hoặc tất cả)\n4. Click **Tạo**\n5. Hệ thống tạo danh sách nhân viên\n6. Nhập số tiền ứng cho từng người hoặc theo tỷ lệ %	2026-01-23 04:19:12.933
27	64a72b50-801c-498a-9c26-e4e84480bff5	\N	user	tạo ứng lương	2026-01-23 04:19:20.772
28	64a72b50-801c-498a-9c26-e4e84480bff5	\N	assistant	Dựa trên tài liệu "Làm sao tạo bảng ứng lương?":\n\n### Làm sao tạo bảng ứng lương?\n\n1. Truy cập menu **Ứng Lương** (đường dẫn `/ung-luong`)\n2. Click nút **Tạo Bảng Ứng Lương**\n3. Chọn:\n   - Kỳ lương (tháng/năm)\n   - Phòng ban (hoặc tất cả)\n4. Click **Tạo**\n5. Hệ thống tạo danh sách nhân viên\n6. Nhập số tiền ứng cho từng người hoặc theo tỷ lệ %...	2026-01-23 04:19:20.777
29	43e4a29a-1f49-4d66-81bd-1295c5220291	\N	user	làm bảng lương	2026-01-23 04:19:20.818
30	43e4a29a-1f49-4d66-81bd-1295c5220291	\N	assistant	Dựa trên tài liệu "Làm sao tạo bảng lương mới?":\n\n### Làm sao tạo bảng lương mới?\n\n1. Truy cập menu **Bảng Lương** (đường dẫn `/bang-luong`)\n2. Click nút **Tạo Bảng Lương**\n3. Chọn:\n   - Kỳ lương (tháng/năm)\n   - Quy chế lương áp dụng\n4. Click **Tạo**\n5. Bảng lương được tạo với trạng thái **NHÁP**...	2026-01-23 04:19:20.821
31	1d76ffe4-e593-45e0-bd92-827276134b29	\N	user	thêm nhân viên	2026-01-23 04:19:20.864
32	1d76ffe4-e593-45e0-bd92-827276134b29	\N	assistant	Dựa trên tài liệu "Làm sao thêm nhân viên mới?":\n\n### Làm sao thêm nhân viên mới?\n\n1. Truy cập menu **Nhân Viên** (`/nhan-vien`)\n2. Click **Thêm Nhân Viên**\n3. Điền thông tin:\n   - Mã nhân viên (tự động hoặc nhập)\n   - Họ tên\n   - Phòng ban\n   - Chức vụ\n   - Lương cơ bản\n4. Click **Lưu**...	2026-01-23 04:19:20.868
33	e60930b7-5bf1-4821-aa1b-23dba44e7916	\N	user	tạo bảng ứng lương	2026-01-23 04:21:49.568
34	e60930b7-5bf1-4821-aa1b-23dba44e7916	\N	assistant	Dựa trên tài liệu "Làm sao tạo bảng ứng lương?":\n\n### Làm sao tạo bảng ứng lương?\n\n1. Truy cập menu **Ứng Lương** (đường dẫn `/ung-luong`)\n2. Click nút **Tạo Bảng Ứng Lương**\n3. Chọn:\n   - Kỳ lương (tháng/năm)\n   - Phòng ban (hoặc tất cả)\n4. Click **Tạo**\n5. Hệ thống tạo danh sách nhân viên\n6. Nhập số tiền ứng cho từng người hoặc theo tỷ lệ %...	2026-01-23 04:21:49.571
35	44ac057c-f0b6-4ba5-8b82-cae3380fe523	\N	user	chốt bảng ứng lương?	2026-01-23 04:22:08.611
36	44ac057c-f0b6-4ba5-8b82-cae3380fe523	\N	assistant	Dựa trên tài liệu "Làm sao tạo bảng ứng lương?":\n\n### Làm sao tạo bảng ứng lương?\n\n1. Truy cập menu **Ứng Lương** (đường dẫn `/ung-luong`)\n2. Click nút **Tạo Bảng Ứng Lương**\n3. Chọn:\n   - Kỳ lương (tháng/năm)\n   - Phòng ban (hoặc tất cả)\n4. Click **Tạo**\n5. Hệ thống tạo danh sách nhân viên\n6. Nhập số tiền ứng cho từng người hoặc theo tỷ lệ %...	2026-01-23 04:22:08.613
37	eafa7d0d-7458-4fa0-a328-dccab6e23fc9	\N	user	chốt ứng lương thế nào?	2026-01-23 04:32:40.468
38	eafa7d0d-7458-4fa0-a328-dccab6e23fc9	\N	assistant	Dựa trên tài liệu "Làm sao tạo bảng ứng lương?":\n\n### Làm sao tạo bảng ứng lương?\n\n1. Truy cập menu **Ứng Lương** (đường dẫn `/ung-luong`)\n2. Click nút **Tạo Bảng Ứng Lương**\n3. Chọn:\n   - Kỳ lương (tháng/năm)\n   - Phòng ban (hoặc tất cả)\n4. Click **Tạo**\n5. Hệ thống tạo danh sách nhân viên\n6. Nhập số tiền ứng cho từng người hoặc theo tỷ lệ %...	2026-01-23 04:32:40.502
39	e74368ee-321f-4f08-b76c-c789c0532650	\N	user	ghi nhận khấu trừ thế nào?	2026-01-23 04:39:41.897
40	e74368ee-321f-4f08-b76c-c789c0532650	\N	assistant	Dựa trên tài liệu "Làm sao tạo đơn nghỉ phép?":\n\n### Làm sao tạo đơn nghỉ phép?\n\n1. Truy cập **Nghỉ Phép > Đơn Của Tôi** (`/nghi-phep/don-cua-toi`)\n2. Click **Tạo Đơn**\n3. Chọn loại nghỉ (phép năm, ốm, việc riêng...)\n4. Chọn ngày bắt đầu - kết thúc\n5. Nhập lý do\n6. Gửi đơn...	2026-01-23 04:39:41.9
41	ba03a40b-cfc7-4f9c-82b5-0af020279ed5	\N	user	hướng dẫn về Bảng lương	2026-01-23 04:41:50.577
42	ba03a40b-cfc7-4f9c-82b5-0af020279ed5	\N	assistant	Dựa trên tài liệu "Làm sao tạo bảng lương mới?":\n\n### Làm sao tạo bảng lương mới?\n\n1. Truy cập menu **Bảng Lương** (đường dẫn `/bang-luong`)\n2. Click nút **Tạo Bảng Lương**\n3. Chọn:\n   - Kỳ lương (tháng/năm)\n   - Quy chế lương áp dụng\n4. Click **Tạo**\n5. Bảng lương được tạo với trạng thái **NHÁP**...	2026-01-23 04:41:50.58
43	4134e63d-5577-4f00-baea-1e271baf49a6	\N	user	Làm sao tạo bảng lương mới?	2026-01-23 04:41:54.988
44	4134e63d-5577-4f00-baea-1e271baf49a6	\N	assistant	**Làm sao tạo bảng lương mới?**\n\n### Làm sao tạo bảng lương mới?\n\n1. Truy cập menu **Bảng Lương** (đường dẫn `/bang-luong`)\n2. Click nút **Tạo Bảng Lương**\n3. Chọn:\n   - Kỳ lương (tháng/năm)\n   - Quy chế lương áp dụng\n4. Click **Tạo**\n5. Bảng lương được tạo với trạng thái **NHÁP**	2026-01-23 04:41:54.99
45	27fe0cd9-1ae9-4149-9b8c-5ab8268fab93	\N	user	Snapshot là gì?	2026-01-23 04:41:58.819
46	27fe0cd9-1ae9-4149-9b8c-5ab8268fab93	\N	assistant	**Thay đổi sau snapshot**\n\n### Thay đổi sau snapshot\n\nNếu ngày 15/02/2026, HR cập nhật lương NV001 lên 15.000.000:\n- Kỳ lương tháng 01/2026 **KHÔNG thay đổi** (vẫn là 12.000.000)\n- Kỳ lương tháng 02/2026 sẽ tính với 15.000.000\n\n---...	2026-01-23 04:41:58.821
\.


--
-- Data for Name: chi_tiet_bang_luong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chi_tiet_bang_luong (id, bang_luong_id, nhan_vien_id, khoan_luong_id, so_tien, nguon, ghi_chu, ngay_tao, ngay_cap_nhat) FROM stdin;
563	103	52	42	1411520	RULE	\N	2026-01-21 02:54:42.818	2026-01-21 02:54:42.818
564	103	52	44	278400	RULE	\N	2026-01-21 02:54:42.818	2026-01-21 02:54:42.818
565	103	53	42	1558080	RULE	\N	2026-01-21 02:54:42.818	2026-01-21 02:54:42.818
566	103	53	44	321600	RULE	\N	2026-01-21 02:54:42.818	2026-01-21 02:54:42.818
567	103	54	42	1325760	RULE	\N	2026-01-21 02:54:42.818	2026-01-21 02:54:42.818
568	103	54	44	219200	RULE	\N	2026-01-21 02:54:42.818	2026-01-21 02:54:42.818
569	103	56	42	1582400	RULE	\N	2026-01-21 02:54:42.818	2026-01-21 02:54:42.818
570	103	56	44	241600	RULE	\N	2026-01-21 02:54:42.818	2026-01-21 02:54:42.818
571	103	57	42	1279680	RULE	\N	2026-01-21 02:54:42.818	2026-01-21 02:54:42.818
572	103	57	44	276800	RULE	\N	2026-01-21 02:54:42.818	2026-01-21 02:54:42.818
573	103	58	42	1469760	RULE	\N	2026-01-21 02:54:42.818	2026-01-21 02:54:42.818
574	103	58	44	212800	RULE	\N	2026-01-21 02:54:42.818	2026-01-21 02:54:42.818
575	103	59	42	1218880	RULE	\N	2026-01-21 02:54:42.818	2026-01-21 02:54:42.818
576	103	59	44	203200	RULE	\N	2026-01-21 02:54:42.818	2026-01-21 02:54:42.818
577	103	60	42	1688320	RULE	\N	2026-01-21 02:54:42.818	2026-01-21 02:54:42.818
578	103	60	44	256000	RULE	\N	2026-01-21 02:54:42.818	2026-01-21 02:54:42.818
579	103	63	42	1435840	RULE	\N	2026-01-21 02:54:42.818	2026-01-21 02:54:42.818
580	103	63	44	284800	RULE	\N	2026-01-21 02:54:42.818	2026-01-21 02:54:42.818
581	103	64	42	1477120	RULE	\N	2026-01-21 02:54:42.818	2026-01-21 02:54:42.818
582	103	64	44	240000	RULE	\N	2026-01-21 02:54:42.818	2026-01-21 02:54:42.818
583	103	75	42	1530240	RULE	\N	2026-01-21 02:54:42.818	2026-01-21 02:54:42.818
584	103	75	44	235200	RULE	\N	2026-01-21 02:54:42.818	2026-01-21 02:54:42.818
23	9	52	21	22367849	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
24	9	53	21	23893474	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
25	9	54	21	8135348	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
26	9	56	21	9843573	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
27	9	57	21	24883067	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
28	9	58	21	4550000	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
29	9	59	21	8827070	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
30	9	60	21	13295806	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
31	9	63	21	24730984	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
32	9	64	21	8024563	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
33	9	75	21	10699264	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
34	10	65	21	14561283	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
35	10	66	21	17089333	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
36	10	67	21	18696781	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
37	10	68	21	15251178	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
38	10	71	21	9147181	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
39	10	72	21	17499573	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
40	11	46	21	24166926	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
41	11	47	21	13818416	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
42	11	48	21	16520402	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
43	11	49	21	24781719	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
44	12	69	21	15448774	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
45	12	76	21	12880296	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
46	12	77	21	14636476	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
47	14	55	21	17220845	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
48	14	70	21	10049353	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
49	15	40	21	10536967	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
50	15	42	21	8217432	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
51	15	50	21	17631264	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
52	16	73	21	20823594	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
53	16	74	21	17498431	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
54	18	44	21	8982627	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
55	18	45	21	16304049	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
56	21	52	21	22367849	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
57	21	53	21	23893474	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
58	21	54	21	8135348	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
59	21	56	21	9843573	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
60	21	57	21	24883067	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
61	21	58	21	4550000	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
62	21	59	21	8827070	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
63	21	60	21	13295806	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
64	21	63	21	24730984	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
65	21	64	21	8024563	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
66	21	75	21	10699264	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
67	22	65	21	14561283	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
68	22	66	21	17089333	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
69	22	67	21	18696781	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
70	22	68	21	15251178	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
71	22	71	21	9147181	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
72	22	72	21	17499573	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
73	23	46	21	24166926	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
74	23	47	21	13818416	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
75	23	48	21	16520402	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
76	23	49	21	24781719	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
77	24	69	21	15448774	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
78	24	76	21	12880296	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
79	24	77	21	14636476	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
80	26	55	21	17220845	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
81	26	70	21	10049353	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
82	27	40	21	10536967	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
83	27	42	21	8217432	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
84	27	50	21	17631264	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
85	28	73	21	20823594	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
86	28	74	21	17498431	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
87	30	44	21	8982627	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
88	30	45	21	16304049	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
89	33	52	21	22367849	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
90	33	53	21	23893474	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
91	33	54	21	8135348	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
92	33	56	21	9843573	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
93	33	57	21	24883067	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
94	33	58	21	4550000	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
95	33	59	21	8827070	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
96	33	60	21	13295806	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
97	33	63	21	24730984	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
98	33	64	21	8024563	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
99	33	75	21	10699264	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
100	34	65	21	14561283	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
101	34	66	21	17089333	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
102	34	67	21	18696781	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
103	34	68	21	15251178	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
104	34	71	21	9147181	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
105	34	72	21	17499573	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
106	35	46	21	24166926	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
107	35	47	21	13818416	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
108	35	48	21	16520402	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
109	35	49	21	24781719	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
110	36	69	21	15448774	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
111	36	76	21	12880296	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
112	36	77	21	14636476	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
113	38	55	21	17220845	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
114	38	70	21	10049353	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
115	39	40	21	10536967	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
116	39	42	21	8217432	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
117	39	50	21	17631264	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
118	40	73	21	20823594	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
119	40	74	21	17498431	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
120	42	44	21	8982627	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
121	42	45	21	16304049	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
122	45	52	21	22367849	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
123	45	53	21	23893474	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
124	45	54	21	8135348	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
125	45	56	21	9843573	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
126	45	57	21	24883067	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
127	45	58	21	4550000	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
128	45	59	21	8827070	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
129	45	60	21	13295806	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
130	45	63	21	24730984	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
131	45	64	21	8024563	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
132	45	75	21	10699264	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
133	46	65	21	14561283	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
134	46	66	21	17089333	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
135	46	67	21	18696781	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
136	46	68	21	15251178	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
137	46	71	21	9147181	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
138	46	72	21	17499573	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
139	47	46	21	24166926	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
140	47	47	21	13818416	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
141	47	48	21	16520402	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
142	47	49	21	24781719	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
143	48	69	21	15448774	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
144	48	76	21	12880296	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
145	48	77	21	14636476	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
146	50	55	21	17220845	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
147	50	70	21	10049353	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
148	51	40	21	10536967	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
149	51	42	21	8217432	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
150	51	50	21	17631264	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
151	52	73	21	20823594	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
152	52	74	21	17498431	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
153	54	44	21	8982627	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
154	54	45	21	16304049	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
155	57	52	21	22367849	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
156	57	53	21	23893474	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
157	57	54	21	8135348	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
158	57	56	21	9843573	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
159	57	57	21	24883067	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
160	57	58	21	4550000	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
161	57	59	21	8827070	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
162	57	60	21	13295806	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
163	57	63	21	24730984	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
164	57	64	21	8024563	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
165	57	75	21	10699264	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
166	58	65	21	14561283	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
167	58	66	21	17089333	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
168	58	67	21	18696781	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
169	58	68	21	15251178	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
170	58	71	21	9147181	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
171	58	72	21	17499573	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
172	59	46	21	24166926	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
173	59	47	21	13818416	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
174	59	48	21	16520402	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
175	59	49	21	24781719	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
176	60	69	21	15448774	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
177	60	76	21	12880296	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
178	60	77	21	14636476	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
179	62	55	21	17220845	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
180	62	70	21	10049353	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
181	63	40	21	10536967	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
182	63	42	21	8217432	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
183	63	50	21	17631264	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
184	64	73	21	20823594	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
185	64	74	21	17498431	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
186	66	44	21	8982627	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
187	66	45	21	16304049	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
188	69	52	21	22367849	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
189	69	53	21	23893474	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
190	69	54	21	8135348	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
191	69	56	21	9843573	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
192	69	57	21	24883067	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
193	69	58	21	4550000	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
194	69	59	21	8827070	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
195	69	60	21	13295806	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
196	69	63	21	24730984	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
197	69	64	21	8024563	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
198	69	75	21	10699264	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
199	70	65	21	14561283	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
200	70	66	21	17089333	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
201	70	67	21	18696781	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
202	70	68	21	15251178	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
203	70	71	21	9147181	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
204	70	72	21	17499573	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
205	71	46	21	24166926	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
206	71	47	21	13818416	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
207	71	48	21	16520402	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
208	71	49	21	24781719	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
209	72	69	21	15448774	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
210	72	76	21	12880296	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
211	72	77	21	14636476	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
212	74	55	21	17220845	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
213	74	70	21	10049353	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
214	75	40	21	10536967	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
215	75	42	21	8217432	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
216	75	50	21	17631264	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
217	76	73	21	20823594	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
218	76	74	21	17498431	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
219	78	44	21	8982627	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
220	78	45	21	16304049	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
221	81	52	21	22367849	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
222	81	53	21	23893474	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
223	81	54	21	8135348	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
224	81	56	21	9843573	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
225	81	57	21	24883067	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
226	81	58	21	4550000	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
227	81	59	21	8827070	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
228	81	60	21	13295806	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
229	81	63	21	24730984	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
230	81	64	21	8024563	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
231	81	75	21	10699264	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
232	82	65	21	14561283	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
233	82	66	21	17089333	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
234	82	67	21	18696781	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
235	82	68	21	15251178	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
236	82	71	21	9147181	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
237	82	72	21	17499573	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
238	83	46	21	24166926	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
239	83	47	21	13818416	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
240	83	48	21	16520402	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
241	83	49	21	24781719	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
242	84	69	21	15448774	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
243	84	76	21	12880296	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
244	84	77	21	14636476	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
245	86	55	21	17220845	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
246	86	70	21	10049353	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
247	87	40	21	10536967	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
248	87	42	21	8217432	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
249	87	50	21	17631264	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
250	88	73	21	20823594	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
251	88	74	21	17498431	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
252	90	44	21	8982627	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
253	90	45	21	16304049	CO_DINH	Seed data	2026-01-16 03:41:21.368	2026-01-16 03:41:21.368
266	95	55	21	2895455	NHAP_TAY	\N	2026-01-20 06:14:25.295	2026-01-21 06:20:57.417
270	95	70	21	2895455	NHAP_TAY	\N	2026-01-20 06:14:25.295	2026-01-21 06:20:57.425
267	95	55	23	669552	CO_DINH	\N	2026-01-20 06:14:25.295	2026-01-20 06:14:25.295
268	95	55	25	760411	CO_DINH	\N	2026-01-20 06:14:25.295	2026-01-20 06:14:25.295
269	95	55	26	552483	CO_DINH	\N	2026-01-20 06:14:25.295	2026-01-20 06:14:25.295
271	95	70	23	490811	CO_DINH	\N	2026-01-20 06:14:25.295	2026-01-20 06:14:25.295
272	95	70	25	900318	CO_DINH	\N	2026-01-20 06:14:25.295	2026-01-20 06:14:25.295
273	95	70	26	583051	CO_DINH	\N	2026-01-20 06:14:25.295	2026-01-20 06:14:25.295
287	96	44	23	716923	CO_DINH	\N	2026-01-20 06:14:25.3	2026-01-20 06:14:25.3
288	96	44	25	808548	CO_DINH	\N	2026-01-20 06:14:25.3	2026-01-20 06:14:25.3
289	96	44	26	901445	CO_DINH	\N	2026-01-20 06:14:25.3	2026-01-20 06:14:25.3
291	96	45	23	447455	CO_DINH	\N	2026-01-20 06:14:25.3	2026-01-20 06:14:25.3
290	96	45	21	4000000	NHAP_TAY	\N	2026-01-20 06:14:25.3	2026-01-20 06:29:04.673
286	96	44	21	3750000	NHAP_TAY	\N	2026-01-20 06:14:25.3	2026-01-20 06:29:13.095
292	96	45	25	558519	CO_DINH	\N	2026-01-20 06:14:25.3	2026-01-20 06:14:25.3
293	96	45	26	634602	CO_DINH	\N	2026-01-20 06:14:25.3	2026-01-20 06:14:25.3
294	94	65	21	14561283	NHAP_TAY	\N	2026-01-20 06:14:25.345	2026-01-20 06:14:25.345
295	94	65	23	684050	CO_DINH	\N	2026-01-20 06:14:25.345	2026-01-20 06:14:25.345
296	94	65	25	501014	CO_DINH	\N	2026-01-20 06:14:25.345	2026-01-20 06:14:25.345
297	94	65	26	642133	CO_DINH	\N	2026-01-20 06:14:25.345	2026-01-20 06:14:25.345
298	94	66	21	17089333	NHAP_TAY	\N	2026-01-20 06:14:25.345	2026-01-20 06:14:25.345
299	94	66	23	691283	CO_DINH	\N	2026-01-20 06:14:25.345	2026-01-20 06:14:25.345
300	94	66	25	563170	CO_DINH	\N	2026-01-20 06:14:25.345	2026-01-20 06:14:25.345
301	94	66	26	625306	CO_DINH	\N	2026-01-20 06:14:25.345	2026-01-20 06:14:25.345
302	94	67	21	18696781	NHAP_TAY	\N	2026-01-20 06:14:25.345	2026-01-20 06:14:25.345
303	94	67	23	361334	CO_DINH	\N	2026-01-20 06:14:25.345	2026-01-20 06:14:25.345
304	94	67	25	754407	CO_DINH	\N	2026-01-20 06:14:25.345	2026-01-20 06:14:25.345
305	94	67	26	687698	CO_DINH	\N	2026-01-20 06:14:25.345	2026-01-20 06:14:25.345
306	94	68	21	15251178	NHAP_TAY	\N	2026-01-20 06:14:25.345	2026-01-20 06:14:25.345
307	94	68	23	523305	CO_DINH	\N	2026-01-20 06:14:25.345	2026-01-20 06:14:25.345
308	94	68	25	825484	CO_DINH	\N	2026-01-20 06:14:25.345	2026-01-20 06:14:25.345
309	94	68	26	723847	CO_DINH	\N	2026-01-20 06:14:25.345	2026-01-20 06:14:25.345
310	94	71	21	9147181	NHAP_TAY	\N	2026-01-20 06:14:25.345	2026-01-20 06:14:25.345
311	94	71	23	339135	CO_DINH	\N	2026-01-20 06:14:25.345	2026-01-20 06:14:25.345
312	94	71	25	729132	CO_DINH	\N	2026-01-20 06:14:25.345	2026-01-20 06:14:25.345
313	94	71	26	862115	CO_DINH	\N	2026-01-20 06:14:25.345	2026-01-20 06:14:25.345
314	94	72	21	17499573	NHAP_TAY	\N	2026-01-20 06:14:25.345	2026-01-20 06:14:25.345
315	94	72	23	744452	CO_DINH	\N	2026-01-20 06:14:25.345	2026-01-20 06:14:25.345
316	94	72	25	611735	CO_DINH	\N	2026-01-20 06:14:25.345	2026-01-20 06:14:25.345
317	94	72	26	507011	CO_DINH	\N	2026-01-20 06:14:25.345	2026-01-20 06:14:25.345
362	98	73	21	20823594	NHAP_TAY	\N	2026-01-20 06:14:25.462	2026-01-20 06:14:25.462
363	98	73	23	748545	CO_DINH	\N	2026-01-20 06:14:25.462	2026-01-20 06:14:25.462
364	98	73	25	622927	CO_DINH	\N	2026-01-20 06:14:25.462	2026-01-20 06:14:25.462
365	98	73	26	552262	CO_DINH	\N	2026-01-20 06:14:25.462	2026-01-20 06:14:25.462
366	98	74	21	17498431	NHAP_TAY	\N	2026-01-20 06:14:25.462	2026-01-20 06:14:25.462
367	98	74	23	534318	CO_DINH	\N	2026-01-20 06:14:25.462	2026-01-20 06:14:25.462
368	98	74	25	948057	CO_DINH	\N	2026-01-20 06:14:25.462	2026-01-20 06:14:25.462
369	98	74	26	896457	CO_DINH	\N	2026-01-20 06:14:25.462	2026-01-20 06:14:25.462
370	101	69	21	15448774	NHAP_TAY	\N	2026-01-20 06:14:25.478	2026-01-20 06:14:25.478
371	101	69	23	426292	CO_DINH	\N	2026-01-20 06:14:25.478	2026-01-20 06:14:25.478
372	101	69	25	585503	CO_DINH	\N	2026-01-20 06:14:25.478	2026-01-20 06:14:25.478
373	101	69	26	859317	CO_DINH	\N	2026-01-20 06:14:25.478	2026-01-20 06:14:25.478
374	101	76	21	12880296	NHAP_TAY	\N	2026-01-20 06:14:25.478	2026-01-20 06:14:25.478
375	101	76	23	399507	CO_DINH	\N	2026-01-20 06:14:25.478	2026-01-20 06:14:25.478
376	101	76	25	753316	CO_DINH	\N	2026-01-20 06:14:25.478	2026-01-20 06:14:25.478
377	101	76	26	631336	CO_DINH	\N	2026-01-20 06:14:25.478	2026-01-20 06:14:25.478
378	101	77	21	14636476	NHAP_TAY	\N	2026-01-20 06:14:25.478	2026-01-20 06:14:25.478
379	101	77	23	439717	CO_DINH	\N	2026-01-20 06:14:25.478	2026-01-20 06:14:25.478
380	101	77	25	719253	CO_DINH	\N	2026-01-20 06:14:25.478	2026-01-20 06:14:25.478
381	101	77	26	973187	CO_DINH	\N	2026-01-20 06:14:25.478	2026-01-20 06:14:25.478
382	100	46	21	24166926	NHAP_TAY	\N	2026-01-20 06:14:25.479	2026-01-20 06:14:25.479
383	100	46	23	637846	CO_DINH	\N	2026-01-20 06:14:25.479	2026-01-20 06:14:25.479
384	100	46	25	708487	CO_DINH	\N	2026-01-20 06:14:25.479	2026-01-20 06:14:25.479
385	100	46	26	615061	CO_DINH	\N	2026-01-20 06:14:25.479	2026-01-20 06:14:25.479
386	100	47	21	13818416	NHAP_TAY	\N	2026-01-20 06:14:25.479	2026-01-20 06:14:25.479
387	100	47	23	734765	CO_DINH	\N	2026-01-20 06:14:25.479	2026-01-20 06:14:25.479
388	100	47	25	775269	CO_DINH	\N	2026-01-20 06:14:25.479	2026-01-20 06:14:25.479
389	100	47	26	998218	CO_DINH	\N	2026-01-20 06:14:25.479	2026-01-20 06:14:25.479
390	100	48	21	16520402	NHAP_TAY	\N	2026-01-20 06:14:25.479	2026-01-20 06:14:25.479
391	100	48	23	673570	CO_DINH	\N	2026-01-20 06:14:25.479	2026-01-20 06:14:25.479
392	100	48	25	582355	CO_DINH	\N	2026-01-20 06:14:25.479	2026-01-20 06:14:25.479
393	100	48	26	707148	CO_DINH	\N	2026-01-20 06:14:25.479	2026-01-20 06:14:25.479
394	100	49	21	24781719	NHAP_TAY	\N	2026-01-20 06:14:25.479	2026-01-20 06:14:25.479
395	100	49	23	538921	CO_DINH	\N	2026-01-20 06:14:25.479	2026-01-20 06:14:25.479
396	100	49	25	994590	CO_DINH	\N	2026-01-20 06:14:25.479	2026-01-20 06:14:25.479
397	100	49	26	517249	CO_DINH	\N	2026-01-20 06:14:25.479	2026-01-20 06:14:25.479
409	96	45	27	400000	NHAP_TAY	\N	2026-01-20 06:27:05.823	2026-01-20 06:27:05.823
410	96	44	27	400000	NHAP_TAY	\N	2026-01-20 06:27:05.841	2026-01-20 06:27:05.841
411	98	73	31	2186478	NHAP_TAY	\N	2026-01-20 06:37:55.569	2026-01-20 06:37:55.569
412	98	73	35	706085	NHAP_TAY	\N	2026-01-20 06:37:55.572	2026-01-20 06:37:55.572
413	98	74	31	1837334	NHAP_TAY	\N	2026-01-20 06:37:55.579	2026-01-20 06:37:55.579
414	98	74	35	453993	NHAP_TAY	\N	2026-01-20 06:37:55.581	2026-01-20 06:37:55.581
454	94	65	43	1115025	RULE	TONG_KHOI_LUONG_THANH_CONG * DON_GIA_KHOI_LUONG = 1.115.025đ	2026-01-20 07:58:57.014	2026-01-20 07:58:57.014
455	94	66	43	1160310	RULE	TONG_KHOI_LUONG_THANH_CONG * DON_GIA_KHOI_LUONG = 1.160.310đ	2026-01-20 07:58:57.024	2026-01-20 07:58:57.024
456	94	67	43	1013975	RULE	TONG_KHOI_LUONG_THANH_CONG * DON_GIA_KHOI_LUONG = 1.013.975đ	2026-01-20 07:58:57.033	2026-01-20 07:58:57.033
457	94	68	43	1157500	RULE	TONG_KHOI_LUONG_THANH_CONG * DON_GIA_KHOI_LUONG = 1.157.500đ	2026-01-20 07:58:57.041	2026-01-20 07:58:57.041
458	94	71	43	951710	RULE	TONG_KHOI_LUONG_THANH_CONG * DON_GIA_KHOI_LUONG = 951.710đ	2026-01-20 07:58:57.05	2026-01-20 07:58:57.05
459	94	72	43	916865	RULE	TONG_KHOI_LUONG_THANH_CONG * DON_GIA_KHOI_LUONG = 916.865đ	2026-01-20 07:58:57.06	2026-01-20 07:58:57.06
493	102	40	21	10536967	NHAP_TAY	\N	2026-01-21 00:37:39.73	2026-01-21 00:37:39.73
494	102	40	23	631810	CO_DINH	\N	2026-01-21 00:37:39.73	2026-01-21 00:37:39.73
495	102	40	25	532145	CO_DINH	\N	2026-01-21 00:37:39.73	2026-01-21 00:37:39.73
496	102	40	26	870094	CO_DINH	\N	2026-01-21 00:37:39.73	2026-01-21 00:37:39.73
497	102	42	21	8217432	NHAP_TAY	\N	2026-01-21 00:37:39.73	2026-01-21 00:37:39.73
498	102	42	23	373081	CO_DINH	\N	2026-01-21 00:37:39.73	2026-01-21 00:37:39.73
499	102	42	25	637245	CO_DINH	\N	2026-01-21 00:37:39.73	2026-01-21 00:37:39.73
500	102	42	26	782342	CO_DINH	\N	2026-01-21 00:37:39.73	2026-01-21 00:37:39.73
501	102	50	21	17631264	NHAP_TAY	\N	2026-01-21 00:37:39.73	2026-01-21 00:37:39.73
502	102	50	23	405383	CO_DINH	\N	2026-01-21 00:37:39.73	2026-01-21 00:37:39.73
503	102	50	25	501813	CO_DINH	\N	2026-01-21 00:37:39.73	2026-01-21 00:37:39.73
504	102	50	26	857741	CO_DINH	\N	2026-01-21 00:37:39.73	2026-01-21 00:37:39.73
505	102	40	41	3000000	UNG_LUONG	\N	2026-01-21 00:37:39.73	2026-01-21 00:37:39.73
506	102	42	41	2000000	UNG_LUONG	\N	2026-01-21 00:37:39.73	2026-01-21 00:37:39.73
507	102	50	41	3000000	UNG_LUONG	\N	2026-01-21 00:37:39.73	2026-01-21 00:37:39.73
509	103	52	23	431917	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
510	103	52	25	719543	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
511	103	52	26	714076	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
513	103	53	23	700692	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
514	103	53	25	610560	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
515	103	53	26	571663	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
517	103	54	23	547146	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
518	103	54	25	657846	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
519	103	54	26	757840	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
521	103	56	23	621619	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
522	103	56	25	670704	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
523	103	56	26	662074	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
525	103	57	23	602508	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
526	103	57	25	724657	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
527	103	57	26	796608	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
529	103	58	23	702243	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
530	103	58	25	881605	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
531	103	58	26	922374	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
533	103	59	23	393035	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
534	103	59	25	936686	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
535	103	59	26	892738	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
537	103	60	23	314510	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
538	103	60	25	784829	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
539	103	60	26	825739	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
541	103	63	23	358689	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
542	103	63	25	674529	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
543	103	63	26	550014	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
545	103	64	23	670927	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
546	103	64	25	530497	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
547	103	64	26	972679	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
549	103	75	23	505386	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
550	103	75	25	970823	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
551	103	75	26	901417	CO_DINH	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
552	103	52	41	300000	UNG_LUONG	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
553	103	53	41	300000	UNG_LUONG	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
554	103	54	41	300000	UNG_LUONG	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
555	103	56	41	300000	UNG_LUONG	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
556	103	57	41	300000	UNG_LUONG	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
557	103	58	41	300000	UNG_LUONG	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
558	103	59	41	300000	UNG_LUONG	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
559	103	60	41	300000	UNG_LUONG	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
560	103	63	41	300000	UNG_LUONG	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
561	103	64	41	300000	UNG_LUONG	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
562	103	75	41	300000	UNG_LUONG	\N	2026-01-21 00:45:51.6	2026-01-21 00:45:51.6
508	103	52	21	4550000	NHAP_TAY	\N	2026-01-21 00:45:51.6	2026-01-21 03:05:31.599
512	103	53	21	4550000	NHAP_TAY	\N	2026-01-21 00:45:51.6	2026-01-21 03:05:31.61
516	103	54	21	4550000	NHAP_TAY	\N	2026-01-21 00:45:51.6	2026-01-21 03:05:31.62
520	103	56	21	4550000	NHAP_TAY	\N	2026-01-21 00:45:51.6	2026-01-21 03:05:31.629
524	103	57	21	4550000	NHAP_TAY	\N	2026-01-21 00:45:51.6	2026-01-21 03:05:31.639
528	103	58	21	4550000	NHAP_TAY	\N	2026-01-21 00:45:51.6	2026-01-21 03:05:31.649
532	103	59	21	4550000	NHAP_TAY	\N	2026-01-21 00:45:51.6	2026-01-21 03:05:31.658
536	103	60	21	4550000	NHAP_TAY	\N	2026-01-21 00:45:51.6	2026-01-21 03:05:31.667
540	103	63	21	4550000	NHAP_TAY	\N	2026-01-21 00:45:51.6	2026-01-21 03:05:31.675
544	103	64	21	4550000	NHAP_TAY	\N	2026-01-21 00:45:51.6	2026-01-21 03:05:31.682
548	103	75	21	4550000	NHAP_TAY	\N	2026-01-21 00:45:51.6	2026-01-21 03:05:31.69
\.


--
-- Data for Name: chi_tiet_bang_ung_luong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chi_tiet_bang_ung_luong (id, bang_ung_luong_id, nhan_vien_id, phong_ban_id, nhom_nhan_vien_id, tien_cong_luy_ke, muc_toi_da_duoc_ung, so_ngay_cong, so_ngay_nghi, so_ngay_nghi_khong_phep, la_tam_tinh, duoc_phep_ung, ly_do_khong_dat, so_tien_ung_de_xuat, so_tien_ung_duyet, ghi_chu, locked_by_snapshot, ngay_tao, ngay_cap_nhat) FROM stdin;
1	3	52	27	\N	4661204	3262843	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
2	3	53	27	\N	8481004	5936703	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
3	3	54	27	\N	6088147	4261703	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
4	3	56	27	\N	6272984	4391089	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
5	3	57	27	\N	9671186	6769830	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
6	3	58	27	\N	5072144	3550501	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
7	3	59	27	\N	4805710	3363997	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
8	3	60	27	\N	6888715	4822100	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
9	3	63	27	\N	7028001	4919601	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
10	3	64	27	\N	9494577	6646204	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
11	3	75	27	\N	4765251	3335676	15.00	0.00	0.00	f	t	\N	500000	500000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
12	4	65	32	\N	8555246	5988672	15.00	0.00	0.00	f	t	\N	2400000	2400000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
13	4	66	32	\N	5151053	3605737	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
14	4	67	32	\N	11351953	7946367	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
15	4	68	32	\N	9579136	6705395	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
16	4	71	32	\N	8503318	5952323	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
17	4	72	32	\N	7635602	5344921	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
18	5	46	25	\N	10966099	7676269	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
19	5	47	25	\N	9887695	6921387	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
20	5	48	25	\N	9008169	6305718	15.00	0.00	0.00	f	t	\N	6200000	6200000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
21	5	49	25	\N	6785863	4750104	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
22	6	69	33	\N	5994148	4195903	15.00	0.00	0.00	f	t	\N	2300000	2300000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
23	6	76	33	\N	5937818	4156472	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
24	6	77	33	\N	8049355	5634548	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
25	8	55	26	\N	8696328	6087430	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
26	8	70	26	\N	5158167	3610717	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
27	9	40	30	\N	10172446	7120712	15.00	0.00	0.00	f	t	\N	4800000	4800000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
28	9	42	30	\N	9017800	6312460	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
29	9	50	30	\N	9156868	6409808	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
30	10	73	24	\N	6296793	4407755	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
31	10	74	24	\N	9082390	6357673	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
32	12	44	31	\N	9980815	6986571	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
33	12	45	31	\N	7778038	5444626	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
34	15	52	27	\N	11391548	7974084	15.00	0.00	0.00	f	t	\N	1600000	1600000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
35	15	53	27	\N	10697646	7488352	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
36	15	54	27	\N	6657166	4660016	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
37	15	56	27	\N	7220923	5054646	15.00	0.00	0.00	f	t	\N	500000	500000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
38	15	57	27	\N	6438452	4506916	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
39	15	58	27	\N	9755842	6829089	15.00	0.00	0.00	f	t	\N	5600000	5600000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
40	15	59	27	\N	8983006	6288104	15.00	0.00	0.00	f	t	\N	1700000	1700000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
41	15	60	27	\N	9969897	6978928	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
42	15	63	27	\N	7851591	5496114	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
43	15	64	27	\N	7150655	5005459	15.00	0.00	0.00	f	t	\N	800000	800000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
44	15	75	27	\N	9076960	6353872	15.00	0.00	0.00	f	t	\N	5900000	5900000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
45	16	65	32	\N	5991762	4194233	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
46	16	66	32	\N	9289945	6502961	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
47	16	67	32	\N	6956493	4869545	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
48	16	68	32	\N	10293263	7205284	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
49	16	71	32	\N	4777145	3344001	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
50	16	72	32	\N	10931097	7651768	15.00	0.00	0.00	f	t	\N	6700000	6700000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
51	17	46	25	\N	5183331	3628332	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
52	17	47	25	\N	6429135	4500395	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
53	17	48	25	\N	11246604	7872623	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
54	17	49	25	\N	7275368	5092757	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
55	18	69	33	\N	8775160	6142612	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
56	18	76	33	\N	5159418	3611593	15.00	0.00	0.00	f	t	\N	1500000	1500000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
57	18	77	33	\N	10478611	7335027	15.00	0.00	0.00	f	t	\N	2000000	2000000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
58	20	55	26	\N	10056250	7039375	15.00	0.00	0.00	f	t	\N	3700000	3700000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
59	20	70	26	\N	6165596	4315917	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
60	21	40	30	\N	7267538	5087277	15.00	0.00	0.00	f	t	\N	4200000	4200000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
61	21	42	30	\N	4970845	3479592	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
62	21	50	30	\N	10470430	7329301	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
63	22	73	24	\N	6963349	4874344	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
64	22	74	24	\N	4694313	3286019	15.00	0.00	0.00	f	t	\N	1300000	1300000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
65	24	44	31	\N	7239278	5067494	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
66	24	45	31	\N	9152545	6406781	15.00	0.00	0.00	f	t	\N	500000	500000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
67	27	52	27	\N	9362255	6553579	15.00	0.00	0.00	f	t	\N	500000	500000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
68	27	53	27	\N	5327712	3729398	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
69	27	54	27	\N	5845288	4091701	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
70	27	56	27	\N	6114846	4280392	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
71	27	57	27	\N	11055121	7738585	15.00	0.00	0.00	f	t	\N	800000	800000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
72	27	58	27	\N	9771538	6840077	15.00	0.00	0.00	f	t	\N	5300000	5300000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
73	27	59	27	\N	7579829	5305880	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
74	27	60	27	\N	7272845	5090992	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
75	27	63	27	\N	10678993	7475295	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
76	27	64	27	\N	6788704	4752093	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
77	27	75	27	\N	10673493	7471445	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
78	28	65	32	\N	7514271	5259990	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
79	28	66	32	\N	6578810	4605167	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
80	28	67	32	\N	6680091	4676064	15.00	0.00	0.00	f	t	\N	500000	500000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
81	28	68	32	\N	7692117	5384482	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
82	28	71	32	\N	6183230	4328261	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
83	28	72	32	\N	6463645	4524552	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
84	29	46	25	\N	11107237	7775066	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
85	29	47	25	\N	5233283	3663298	15.00	0.00	0.00	f	t	\N	3500000	3500000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
86	29	48	25	\N	5389820	3772874	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
87	29	49	25	\N	8686314	6080420	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
88	30	69	33	\N	11370205	7959144	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
89	30	76	33	\N	5480911	3836638	15.00	0.00	0.00	f	t	\N	2400000	2400000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
90	30	77	33	\N	10728017	7509612	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
91	32	55	26	\N	6957088	4869961	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
92	32	70	26	\N	6677755	4674429	15.00	0.00	0.00	f	t	\N	1200000	1200000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
93	33	40	30	\N	7573191	5301234	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
94	33	42	30	\N	5177763	3624434	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
95	33	50	30	\N	6998581	4899007	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
96	34	73	24	\N	9389250	6572475	15.00	0.00	0.00	f	t	\N	500000	500000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
97	34	74	24	\N	10906349	7634445	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
98	36	44	31	\N	5230249	3661174	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
99	36	45	31	\N	10337126	7235988	15.00	0.00	0.00	f	t	\N	5900000	5900000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
100	39	52	27	\N	6737819	4716474	15.00	0.00	0.00	f	t	\N	2100000	2100000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
101	39	53	27	\N	6091313	4263919	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
102	39	54	27	\N	8526969	5968878	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
103	39	56	27	\N	5971647	4180153	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
104	39	57	27	\N	9018200	6312740	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
105	39	58	27	\N	9835104	6884573	15.00	0.00	0.00	f	t	\N	5400000	5400000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
106	39	59	27	\N	7080921	4956645	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
107	39	60	27	\N	9906482	6934537	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
108	39	63	27	\N	9853780	6897646	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
109	39	64	27	\N	5735181	4014627	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
110	39	75	27	\N	7299992	5109994	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
111	40	65	32	\N	9476528	6633569	15.00	0.00	0.00	f	t	\N	5100000	5100000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
112	40	66	32	\N	4918589	3443012	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
113	40	67	32	\N	5929349	4150544	15.00	0.00	0.00	f	t	\N	2900000	2900000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
114	40	68	32	\N	10510373	7357261	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
115	40	71	32	\N	5390067	3773047	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
116	40	72	32	\N	7438547	5206983	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
117	41	46	25	\N	10845376	7591763	15.00	0.00	0.00	f	t	\N	4400000	4400000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
118	41	47	25	\N	6098469	4268928	15.00	0.00	0.00	f	t	\N	3200000	3200000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
119	41	48	25	\N	4857538	3400277	15.00	0.00	0.00	f	t	\N	2100000	2100000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
120	41	49	25	\N	7248370	5073859	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
121	42	69	33	\N	10375600	7262920	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
122	42	76	33	\N	11225336	7857735	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
123	42	77	33	\N	11347851	7943496	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
124	44	55	26	\N	5697448	3988214	15.00	0.00	0.00	f	t	\N	1800000	1800000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
125	44	70	26	\N	10920248	7644174	15.00	0.00	0.00	f	t	\N	6800000	6800000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
126	45	40	30	\N	10776444	7543511	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
127	45	42	30	\N	10890150	7623105	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
128	45	50	30	\N	8659784	6061849	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
129	46	73	24	\N	10558697	7391088	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
130	46	74	24	\N	11280160	7896112	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
131	48	44	31	\N	6610766	4627536	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
132	48	45	31	\N	5174675	3622272	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
133	51	52	27	\N	7917312	5542118	15.00	0.00	0.00	f	t	\N	4000000	4000000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
134	51	53	27	\N	7324160	5126912	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
135	51	54	27	\N	11332611	7932828	15.00	0.00	0.00	f	t	\N	2200000	2200000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
136	51	56	27	\N	4689587	3282711	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
137	51	57	27	\N	9737886	6816520	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
138	51	58	27	\N	7656270	5359389	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
139	51	59	27	\N	8374156	5861909	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
140	51	60	27	\N	6737096	4715967	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
141	51	63	27	\N	6120023	4284016	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
142	51	64	27	\N	9952178	6966524	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
143	51	75	27	\N	5693907	3985735	15.00	0.00	0.00	f	t	\N	2400000	2400000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
144	52	65	32	\N	6573661	4601563	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
145	52	66	32	\N	4640868	3248608	15.00	0.00	0.00	f	t	\N	2700000	2700000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
146	52	67	32	\N	7903466	5532426	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
147	52	68	32	\N	5013069	3509148	15.00	0.00	0.00	f	t	\N	3100000	3100000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
148	52	71	32	\N	10159894	7111926	15.00	0.00	0.00	f	t	\N	500000	500000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
149	52	72	32	\N	5709666	3996766	15.00	0.00	0.00	f	t	\N	500000	500000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
150	53	46	25	\N	6149006	4304304	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
151	53	47	25	\N	7452035	5216425	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
152	53	48	25	\N	8989348	6292543	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
153	53	49	25	\N	5214857	3650400	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
154	54	69	33	\N	10129534	7090674	15.00	0.00	0.00	f	t	\N	1500000	1500000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
155	54	76	33	\N	5522170	3865519	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
156	54	77	33	\N	11315243	7920670	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
157	56	55	26	\N	7709162	5396414	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
158	56	70	26	\N	10181886	7127320	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
159	57	40	30	\N	11065824	7746077	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
160	57	42	30	\N	5225328	3657730	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
161	57	50	30	\N	7193001	5035101	15.00	0.00	0.00	f	t	\N	3600000	3600000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
162	58	73	24	\N	11504910	8053437	15.00	0.00	0.00	f	t	\N	4000000	4000000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
163	58	74	24	\N	4868859	3408201	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
164	60	44	31	\N	8233471	5763430	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
165	60	45	31	\N	9545104	6681573	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
166	63	52	27	\N	7111158	4977811	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
167	63	53	27	\N	9022061	6315443	15.00	0.00	0.00	f	t	\N	5200000	5200000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
168	63	54	27	\N	9806357	6864450	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
169	63	56	27	\N	4998928	3499249	15.00	0.00	0.00	f	t	\N	600000	600000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
170	63	57	27	\N	4837040	3385928	15.00	0.00	0.00	f	t	\N	1200000	1200000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
171	63	58	27	\N	9319737	6523816	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
172	63	59	27	\N	7201975	5041383	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
173	63	60	27	\N	5614887	3930421	15.00	0.00	0.00	f	t	\N	3200000	3200000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
174	63	63	27	\N	8696982	6087887	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
175	63	64	27	\N	9670400	6769280	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
176	63	75	27	\N	5554778	3888344	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
177	64	65	32	\N	10624807	7437365	15.00	0.00	0.00	f	t	\N	2300000	2300000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
178	64	66	32	\N	9740155	6818108	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
179	64	67	32	\N	5642650	3949855	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
180	64	68	32	\N	6031288	4221902	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
181	64	71	32	\N	5503204	3852243	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
182	64	72	32	\N	9027130	6318991	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
183	65	46	25	\N	8095670	5666969	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
184	65	47	25	\N	7659916	5361941	15.00	0.00	0.00	f	t	\N	4800000	4800000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
185	65	48	25	\N	5285376	3699763	15.00	0.00	0.00	f	t	\N	2600000	2600000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
186	65	49	25	\N	10204857	7143400	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
187	66	69	33	\N	5653620	3957534	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
188	66	76	33	\N	7432470	5202729	15.00	0.00	0.00	f	t	\N	500000	500000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
189	66	77	33	\N	4716967	3301877	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
190	68	55	26	\N	8406840	5884788	15.00	0.00	0.00	f	t	\N	500000	500000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
191	68	70	26	\N	8004513	5603159	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
192	69	40	30	\N	6041760	4229232	15.00	0.00	0.00	f	t	\N	500000	500000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
193	69	42	30	\N	11136276	7795393	15.00	0.00	0.00	f	t	\N	2300000	2300000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
194	69	50	30	\N	5513479	3859435	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
195	70	73	24	\N	10320298	7224208	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
196	70	74	24	\N	8297928	5808550	15.00	0.00	0.00	f	t	\N	500000	500000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
197	72	44	31	\N	9475093	6632565	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
198	72	45	31	\N	8698555	6088989	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
199	75	52	27	\N	9659249	6761475	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
200	75	53	27	\N	6267863	4387504	15.00	0.00	0.00	f	t	\N	3000000	3000000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
201	75	54	27	\N	11485303	8039712	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
202	75	56	27	\N	11434542	8004179	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
203	75	57	27	\N	8877752	6214427	15.00	0.00	0.00	f	t	\N	3200000	3200000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
204	75	58	27	\N	5047563	3533294	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
205	75	59	27	\N	6467707	4527395	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
206	75	60	27	\N	5898315	4128821	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
207	75	63	27	\N	11301607	7911125	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
208	75	64	27	\N	11331063	7931744	15.00	0.00	0.00	f	t	\N	4300000	4300000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
209	75	75	27	\N	7041976	4929383	15.00	0.00	0.00	f	t	\N	2600000	2600000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
210	76	65	32	\N	6795066	4756546	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
211	76	66	32	\N	9008234	6305764	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
212	76	67	32	\N	8568256	5997779	15.00	0.00	0.00	f	t	\N	4100000	4100000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
213	76	68	32	\N	11334199	7933939	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
214	76	71	32	\N	7516195	5261337	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
215	76	72	32	\N	8483207	5938245	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
216	77	46	25	\N	9781274	6846892	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
217	77	47	25	\N	10225328	7157729	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
218	77	48	25	\N	4800989	3360692	15.00	0.00	0.00	f	t	\N	2600000	2600000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
219	77	49	25	\N	6198410	4338887	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
220	78	69	33	\N	9018371	6312860	15.00	0.00	0.00	f	t	\N	4900000	4900000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
221	78	76	33	\N	8484749	5939325	15.00	0.00	0.00	f	t	\N	5600000	5600000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
222	78	77	33	\N	5784822	4049375	15.00	0.00	0.00	f	t	\N	3400000	3400000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
223	80	55	26	\N	9309158	6516411	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
224	80	70	26	\N	10524958	7367470	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
225	81	40	30	\N	10931298	7651909	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
226	81	42	30	\N	4756527	3329569	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
227	81	50	30	\N	5368296	3757807	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
228	82	73	24	\N	4752718	3326903	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
229	82	74	24	\N	10759832	7531883	15.00	0.00	0.00	f	t	\N	0	0	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
230	84	44	31	\N	7277939	5094558	15.00	0.00	0.00	f	t	\N	1700000	1700000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
231	84	45	31	\N	6103559	4272492	15.00	0.00	0.00	f	t	\N	500000	500000	Seed data	f	2026-01-16 04:05:01.362	2026-01-16 04:05:01.362
243	87	65	32	\N	3461538	2423077	15.00	0.00	0.00	f	t	\N	4000000	5000000	\N	f	2026-01-16 04:36:18.985	2026-01-16 04:36:18.985
244	87	66	32	\N	3461538	2423077	15.00	0.00	0.00	f	t	\N	4000000	2000000	\N	f	2026-01-16 04:36:18.985	2026-01-16 04:36:18.985
245	87	67	32	\N	3461538	2423077	15.00	0.00	0.00	f	t	\N	2000000	3000000	\N	f	2026-01-16 04:36:18.985	2026-01-16 04:36:18.985
246	87	68	32	\N	2596154	1817308	15.00	0.00	0.00	f	t	\N	2000000	5000000	\N	f	2026-01-16 04:36:18.985	2026-01-16 04:36:18.985
247	87	71	32	\N	2596154	1817308	15.00	0.00	0.00	f	t	\N	3000000	2000000	\N	f	2026-01-16 04:36:18.985	2026-01-16 04:36:18.985
248	87	72	32	\N	2596154	1817308	15.00	0.00	0.00	f	t	\N	3000000	4000000	\N	f	2026-01-16 04:36:18.985	2026-01-16 04:36:18.985
249	88	46	25	\N	2307692	1615385	15.00	0.00	0.00	f	t	\N	4000000	3000000	\N	f	2026-01-16 04:36:18.985	2026-01-16 04:36:18.985
250	88	47	25	\N	2307692	1615385	15.00	0.00	0.00	f	t	\N	4000000	3000000	\N	f	2026-01-16 04:36:18.985	2026-01-16 04:36:18.985
251	88	48	25	\N	2307692	1615385	15.00	0.00	0.00	f	t	\N	3000000	3000000	\N	f	2026-01-16 04:36:18.985	2026-01-16 04:36:18.985
252	88	49	25	\N	3461538	2423077	15.00	0.00	0.00	f	t	\N	3000000	5000000	\N	f	2026-01-16 04:36:18.985	2026-01-16 04:36:18.985
253	89	69	33	\N	3173077	2221154	15.00	0.00	0.00	f	t	\N	5000000	3000000	\N	f	2026-01-16 04:36:18.985	2026-01-16 04:36:18.985
254	89	76	33	\N	3461538	2423077	15.00	0.00	0.00	f	t	\N	5000000	3000000	\N	f	2026-01-16 04:36:18.985	2026-01-16 04:36:18.985
255	89	77	33	\N	3461538	2423077	15.00	0.00	0.00	f	t	\N	3000000	3000000	\N	f	2026-01-16 04:36:18.985	2026-01-16 04:36:18.985
256	91	55	26	\N	2625000	1837500	15.00	0.00	0.00	f	t	\N	3000000	4000000	\N	f	2026-01-16 04:36:18.985	2026-01-16 04:36:18.985
257	91	70	26	\N	2625000	1837500	15.00	0.00	0.00	f	t	\N	5000000	5000000	\N	f	2026-01-16 04:36:18.985	2026-01-16 04:36:18.985
261	93	73	24	\N	2019231	1413462	15.00	0.00	0.00	f	t	\N	5000000	5000000	\N	f	2026-01-16 04:36:18.985	2026-01-16 04:36:18.985
262	93	74	24	\N	2019231	1413462	15.00	0.00	0.00	f	t	\N	3000000	3000000	\N	f	2026-01-16 04:36:18.985	2026-01-16 04:36:18.985
263	95	44	31	\N	3173077	2221154	15.00	0.00	0.00	f	t	\N	5000000	5000000	\N	f	2026-01-16 04:36:18.985	2026-01-16 04:36:18.985
264	95	45	31	\N	3173077	2221154	15.00	0.00	0.00	f	t	\N	3000000	4000000	\N	f	2026-01-16 04:36:18.985	2026-01-16 04:36:18.985
268	97	40	30	3	5268484	3680000	11.00	0.00	0.00	t	t	\N	0	3000000	\N	t	2026-01-20 08:07:38.77	2026-01-20 08:21:11.473
269	97	42	30	3	4108716	2870000	11.00	0.00	0.00	t	t	\N	0	2000000	\N	t	2026-01-20 08:07:38.77	2026-01-20 08:21:11.473
270	97	50	30	3	8815632	6170000	11.00	0.00	0.00	t	t	\N	0	3000000	\N	t	2026-01-20 08:07:38.77	2026-01-20 08:21:11.473
232	86	52	27	\N	2625000	1837500	15.00	0.00	0.00	f	t	\N	4000000	300000	\N	t	2026-01-16 04:36:18.985	2026-01-20 06:21:17.485
233	86	53	27	\N	2625000	1837500	15.00	0.00	0.00	f	t	\N	4000000	300000	\N	t	2026-01-16 04:36:18.985	2026-01-20 06:21:17.485
234	86	54	27	\N	2625000	1837500	15.00	0.00	0.00	f	t	\N	3000000	300000	\N	t	2026-01-16 04:36:18.985	2026-01-20 06:21:17.485
235	86	56	27	\N	2625000	1837500	15.00	0.00	0.00	f	t	\N	4000000	300000	\N	t	2026-01-16 04:36:18.985	2026-01-20 06:21:17.485
236	86	57	27	\N	2625000	1837500	15.00	0.00	0.00	f	t	\N	5000000	300000	\N	t	2026-01-16 04:36:18.985	2026-01-20 06:21:17.485
237	86	58	27	\N	2625000	1837500	15.00	0.00	0.00	f	t	\N	2000000	300000	\N	t	2026-01-16 04:36:18.985	2026-01-20 06:21:17.485
238	86	59	27	\N	2625000	1837500	15.00	0.00	0.00	f	t	\N	2000000	300000	\N	t	2026-01-16 04:36:18.985	2026-01-20 06:21:17.485
239	86	60	27	\N	2625000	1837500	15.00	0.00	0.00	f	t	\N	3000000	300000	\N	t	2026-01-16 04:36:18.985	2026-01-20 06:21:17.485
240	86	63	27	\N	2625000	1837500	15.00	0.00	0.00	f	t	\N	5000000	300000	\N	t	2026-01-16 04:36:18.985	2026-01-20 06:21:17.485
241	86	64	27	\N	2625000	1837500	15.00	0.00	0.00	f	t	\N	2000000	300000	\N	t	2026-01-16 04:36:18.985	2026-01-20 06:21:17.485
242	86	75	27	\N	2625000	1837500	15.00	0.00	0.00	f	t	\N	5000000	300000	\N	t	2026-01-16 04:36:18.985	2026-01-20 06:21:17.485
\.


--
-- Data for Name: chi_tiet_cham_cong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chi_tiet_cham_cong (id, nhan_vien_id, ngay, gio_vao, gio_ra, loai_ngay, trang_thai, so_gio_lam, so_gio_ot, ghi_chu, ngay_tao, ca_lam_viec_id, gio_vao_du_kien, gio_ra_du_kien, phut_di_tre, phut_ve_som) FROM stdin;
\.


--
-- Data for Name: chi_tiet_nghi_phep_ngay; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chi_tiet_nghi_phep_ngay (id, don_nghi_phep_id, nhan_vien_id, ngay, so_gio_nghi, loai_nghi_id, co_tinh_luong, co_tinh_chuyen_can, ngay_tao) FROM stdin;
\.


--
-- Data for Name: chi_tiet_phieu_dieu_chinh; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chi_tiet_phieu_dieu_chinh (id, phieu_dieu_chinh_id, khoan_luong_id, so_tien_cu, so_tien_moi, chenh_lech, ghi_chu, ngay_tao) FROM stdin;
1	2	28	0	900000	900000	Thưởng đột xuất	2026-01-16 03:43:05.369
2	3	28	0	700000	700000	Khấu trừ ứng lương	2026-01-16 03:43:05.369
3	4	28	0	200000	200000	Khấu trừ ứng lương	2026-01-16 03:43:05.369
4	5	28	0	2000000	2000000	Thưởng hoàn thành KPI	2026-01-16 03:43:05.369
5	6	28	0	1600000	1600000	Thưởng đột xuất	2026-01-16 03:43:05.369
6	7	28	0	1100000	1100000	Thưởng hoàn thành KPI	2026-01-16 03:43:05.369
7	8	28	0	1800000	1800000	Thưởng đột xuất	2026-01-16 03:43:05.369
8	9	28	0	1100000	1100000	Thưởng hoàn thành KPI	2026-01-16 03:43:05.369
9	10	28	0	1800000	1800000	Thưởng hoàn thành KPI	2026-01-16 03:43:05.369
10	11	28	0	1600000	1600000	Thưởng nóng	2026-01-16 03:43:05.369
11	12	28	0	900000	900000	Thưởng hoàn thành KPI	2026-01-16 03:43:05.369
12	13	28	0	900000	900000	Thưởng đột xuất	2026-01-16 03:43:05.369
13	14	28	0	2000000	2000000	Thưởng nóng	2026-01-16 03:43:05.369
14	15	28	0	1500000	1500000	Thưởng hoàn thành KPI	2026-01-16 03:43:05.369
15	16	28	0	600000	600000	Thưởng đột xuất	2026-01-16 03:43:05.369
16	17	28	0	1400000	1400000	Thưởng đột xuất	2026-01-16 03:43:05.369
17	18	28	0	500000	500000	Phạt vi phạm quy chế	2026-01-16 03:44:03.59
18	19	28	0	400000	400000	Phạt vi phạm quy chế	2026-01-16 03:44:03.59
19	20	28	0	700000	700000	Thưởng đột xuất	2026-01-16 03:44:03.59
20	21	28	0	1800000	1800000	Thưởng nóng	2026-01-16 03:44:03.59
21	22	41	0	3000000	3000000	Từ bảng ứng lương UL2026-01-30	2026-01-16 07:34:26.504
22	23	41	0	3000000	3000000	Từ bảng ứng lương UL2026-01-30	2026-01-16 07:34:26.512
23	24	41	0	4000000	4000000	Từ bảng ứng lương UL2026-01-30	2026-01-16 07:34:26.517
24	25	41	0	300000	300000	Từ bảng ứng lương UL2026-01-27	2026-01-20 06:21:29.066
25	26	41	0	300000	300000	Từ bảng ứng lương UL2026-01-27	2026-01-20 06:21:29.088
26	27	41	0	300000	300000	Từ bảng ứng lương UL2026-01-27	2026-01-20 06:21:29.098
27	28	41	0	300000	300000	Từ bảng ứng lương UL2026-01-27	2026-01-20 06:21:29.109
28	29	41	0	300000	300000	Từ bảng ứng lương UL2026-01-27	2026-01-20 06:21:29.12
29	30	41	0	300000	300000	Từ bảng ứng lương UL2026-01-27	2026-01-20 06:21:29.13
30	31	41	0	300000	300000	Từ bảng ứng lương UL2026-01-27	2026-01-20 06:21:29.14
31	32	41	0	300000	300000	Từ bảng ứng lương UL2026-01-27	2026-01-20 06:21:29.147
32	33	41	0	300000	300000	Từ bảng ứng lương UL2026-01-27	2026-01-20 06:21:29.156
33	34	41	0	300000	300000	Từ bảng ứng lương UL2026-01-27	2026-01-20 06:21:29.169
34	35	41	0	300000	300000	Từ bảng ứng lương UL2026-01-27	2026-01-20 06:21:29.177
35	36	41	0	3000000	3000000	Từ bảng ứng lương UL-202601-10	2026-01-20 08:21:17.125
36	37	41	0	2000000	2000000	Từ bảng ứng lương UL-202601-10	2026-01-20 08:21:17.142
37	38	41	0	3000000	3000000	Từ bảng ứng lương UL-202601-10	2026-01-20 08:21:17.154
\.


--
-- Data for Name: chi_tieu_kpi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chi_tieu_kpi (id, template_id, ma_chi_tieu, ten_chi_tieu, mo_ta, don_vi_tinh, trong_so, loai_chi_tieu, chi_tieu_toi_thieu, chi_tieu_muc_tieu, chi_tieu_vuot_muc, thu_tu, ngay_tao) FROM stdin;
\.


--
-- Data for Name: co_cau_luong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.co_cau_luong (id, phong_ban_id, ten_co_cau, mo_ta, trang_thai, ngay_tao, ngay_cap_nhat) FROM stdin;
\.


--
-- Data for Name: co_cau_luong_chi_tiet; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.co_cau_luong_chi_tiet (id, co_cau_luong_id, khoan_luong_id, bat_buoc, gia_tri_mac_dinh, ngay_tao, ngay_cap_nhat) FROM stdin;
\.


--
-- Data for Name: cong_thuc_luong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cong_thuc_luong (id, ma_cong_thuc, ten_cong_thuc, mo_ta, phong_ban_id, cong_thuc, phien_ban, tu_ngay, den_ngay, trang_thai, nguoi_tao, ngay_tao, ngay_cap_nhat) FROM stdin;
\.


--
-- Data for Name: danh_gia_kpi_nhan_vien; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.danh_gia_kpi_nhan_vien (id, ky_danh_gia_id, nhan_vien_id, template_id, diem_tong_ket, xep_loai, he_so_thuong, so_tien_thuong, nhan_xet_chung, nguoi_danh_gia, ngay_danh_gia, nguoi_duyet, ngay_duyet, trang_thai, ngay_tao, ngay_cap_nhat) FROM stdin;
1	3	40	1	88.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
2	3	42	1	88.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
3	3	44	1	70.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
4	3	45	1	89.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
5	3	46	1	88.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
6	3	47	1	81.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
7	3	48	1	88.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
8	3	49	1	95.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
9	3	50	1	99.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
10	3	52	1	88.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
11	3	53	1	81.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
12	3	54	1	95.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
13	3	55	1	70.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
14	3	56	1	85.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
15	3	57	1	90.00	TRUNG_BINH	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
16	3	58	1	90.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
17	3	59	1	83.00	TRUNG_BINH	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
18	3	60	1	80.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
19	3	63	1	94.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
20	3	64	1	97.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
21	3	65	1	89.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
22	3	66	1	99.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
23	3	67	1	82.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
24	3	68	1	88.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
25	3	69	1	82.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
26	3	70	1	89.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
27	3	71	1	72.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
28	3	72	1	85.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
29	3	73	1	94.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
30	3	74	1	83.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
31	3	75	1	81.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
32	3	76	1	89.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
33	3	77	1	89.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
34	4	40	1	84.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
35	4	42	1	84.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
36	4	44	1	86.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
37	4	45	1	89.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
38	4	46	1	81.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
39	4	47	1	81.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
40	4	48	1	89.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
41	4	49	1	79.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
42	4	50	1	81.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
43	4	52	1	89.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
44	4	53	1	85.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
45	4	54	1	85.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
46	4	55	1	80.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
47	4	56	1	93.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
48	4	57	1	100.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
49	4	58	1	81.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
50	4	59	1	96.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
51	4	60	1	95.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
52	4	63	1	84.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
53	4	64	1	81.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
54	4	65	1	84.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
55	4	66	1	84.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
56	4	67	1	71.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
57	4	68	1	71.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
58	4	69	1	83.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
59	4	70	1	94.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
60	4	71	1	84.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
61	4	72	1	75.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
62	4	73	1	86.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
63	4	74	1	71.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
64	4	75	1	81.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
65	4	76	1	83.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
66	4	77	1	97.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
67	5	40	1	98.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
68	5	42	1	99.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
69	5	44	1	85.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
70	5	45	1	96.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
71	5	46	1	84.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
72	5	47	1	85.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
73	5	48	1	84.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
74	5	49	1	84.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
75	5	50	1	83.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
76	5	52	1	74.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
77	5	53	1	85.00	TRUNG_BINH	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
78	5	54	1	75.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
79	5	55	1	86.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
80	5	56	1	83.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
81	5	57	1	70.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
82	5	58	1	74.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
83	5	59	1	85.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
84	5	60	1	87.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
85	5	63	1	94.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
86	5	64	1	94.00	TRUNG_BINH	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
87	5	65	1	91.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
88	5	66	1	78.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
89	5	67	1	77.00	TRUNG_BINH	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
90	5	68	1	98.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
91	5	69	1	88.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
92	5	70	1	72.00	TRUNG_BINH	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
93	5	71	1	79.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
94	5	72	1	72.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
95	5	73	1	97.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
96	5	74	1	80.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
97	5	75	1	88.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
98	5	76	1	89.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
99	5	77	1	85.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
100	6	40	1	85.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
101	6	42	1	96.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
102	6	44	1	99.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
103	6	45	1	90.00	TRUNG_BINH	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
104	6	46	1	77.00	TRUNG_BINH	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
105	6	47	1	97.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
106	6	48	1	96.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
107	6	49	1	78.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
108	6	50	1	79.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
109	6	52	1	84.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
110	6	53	1	84.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
111	6	54	1	82.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
112	6	55	1	87.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
113	6	56	1	89.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
114	6	57	1	91.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
115	6	58	1	95.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
116	6	59	1	95.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
117	6	60	1	84.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
118	6	63	1	87.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
119	6	64	1	84.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
120	6	65	1	99.00	TRUNG_BINH	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
121	6	66	1	78.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
122	6	67	1	84.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
123	6	68	1	89.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
124	6	69	1	90.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
125	6	70	1	73.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
126	6	71	1	81.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
127	6	72	1	70.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
128	6	73	1	93.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
129	6	74	1	81.00	TRUNG_BINH	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
130	6	75	1	87.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
131	6	76	1	86.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
132	6	77	1	89.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
133	7	40	1	100.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
134	7	42	1	80.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
135	7	44	1	91.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
136	7	45	1	87.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
137	7	46	1	76.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
138	7	47	1	70.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
139	7	48	1	82.00	TRUNG_BINH	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
140	7	49	1	74.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
141	7	50	1	96.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
142	7	52	1	74.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
143	7	53	1	80.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
144	7	54	1	89.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
145	7	55	1	85.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
146	7	56	1	81.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
147	7	57	1	99.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
148	7	58	1	80.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
149	7	59	1	84.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
150	7	60	1	94.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
151	7	63	1	88.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
152	7	64	1	98.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
153	7	65	1	85.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
154	7	66	1	80.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
155	7	67	1	89.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
156	7	68	1	90.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
157	7	69	1	99.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
158	7	70	1	86.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
159	7	71	1	96.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
160	7	72	1	79.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
161	7	73	1	86.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
162	7	74	1	80.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
163	7	75	1	88.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
164	7	76	1	87.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
165	7	77	1	86.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
166	8	40	1	89.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
167	8	42	1	79.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
168	8	44	1	98.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
169	8	45	1	96.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
170	8	46	1	84.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
171	8	47	1	75.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
172	8	48	1	91.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
173	8	49	1	94.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
174	8	50	1	99.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
175	8	52	1	90.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
176	8	53	1	81.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
177	8	54	1	82.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
178	8	55	1	84.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
179	8	56	1	75.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
180	8	57	1	99.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
181	8	58	1	81.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
182	8	59	1	78.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
183	8	60	1	95.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
184	8	63	1	83.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
185	8	64	1	97.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
186	8	65	1	70.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
187	8	66	1	84.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
188	8	67	1	88.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
189	8	68	1	96.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
190	8	69	1	72.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
191	8	70	1	87.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
192	8	71	1	89.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
193	8	72	1	82.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
194	8	73	1	79.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
195	8	74	1	72.00	TRUNG_BINH	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
196	8	75	1	91.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
197	8	76	1	85.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
198	8	77	1	84.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
199	9	40	1	85.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
200	9	42	1	80.00	TRUNG_BINH	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
201	9	44	1	86.00	TRUNG_BINH	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
202	9	45	1	78.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
203	9	46	1	98.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
204	9	47	1	75.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
205	9	48	1	95.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
206	9	49	1	95.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
207	9	50	1	62.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
208	9	52	1	87.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
209	9	53	1	75.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
210	9	54	1	83.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
211	9	55	1	85.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
212	9	56	1	82.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
213	9	57	1	85.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
214	9	58	1	88.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
215	9	59	1	70.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
216	9	60	1	72.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
217	9	63	1	73.00	TRUNG_BINH	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
218	9	64	1	74.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
219	9	65	1	83.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
220	9	66	1	99.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
221	9	67	1	83.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
222	9	68	1	81.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
223	9	69	1	94.00	TRUNG_BINH	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
224	9	70	1	82.00	XUAT_SAC	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
225	9	71	1	75.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
226	9	72	1	82.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
227	9	73	1	85.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
228	9	74	1	87.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
229	9	75	1	90.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
230	9	76	1	99.00	KHA	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
231	9	77	1	87.00	TOT	1.00	0	Seed data	\N	\N	\N	\N	DA_DUYET	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
\.


--
-- Data for Name: danh_muc_loai_nghi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.danh_muc_loai_nghi (id, ma_loai_nghi, ten_loai_nghi, nhom_loai, co_tinh_luong, co_tinh_chuyen_can, thu_tu_hien_thi, is_active, tao_boi, cap_nhat_boi, ngay_tao, ngay_cap_nhat) FROM stdin;
1	PHEP_NAM	Phép năm	CO_PHEP	t	t	1	t	\N	\N	2026-01-16 02:27:21.341	2026-01-16 02:27:21.341
2	OM	Nghỉ ốm	CO_PHEP	t	t	2	t	\N	\N	2026-01-16 02:27:21.341	2026-01-16 02:27:21.341
3	THAI_SAN	Nghỉ thai sản	CO_PHEP	f	t	3	t	\N	\N	2026-01-16 02:27:21.341	2026-01-16 02:27:21.341
4	VIEC_RIENG_CO_LUONG	Việc riêng có lương	CO_PHEP	t	t	4	t	\N	\N	2026-01-16 02:27:21.341	2026-01-16 02:27:21.341
5	VIEC_RIENG_KHONG_LUONG	Việc riêng không lương	CO_PHEP	f	t	5	t	\N	\N	2026-01-16 02:27:21.341	2026-01-16 02:27:21.341
6	KHONG_PHEP	Nghỉ không phép	KHONG_PHEP	f	f	99	t	\N	\N	2026-01-16 02:27:21.341	2026-01-16 02:27:21.341
\.


--
-- Data for Name: danh_muc_loai_yeu_cau; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.danh_muc_loai_yeu_cau (id, ma_loai, ten_loai, mo_ta, nhom_loai, yeu_cau_gio_bat_dau, yeu_cau_gio_ket_thuc, yeu_cau_dia_diem, co_tinh_ot, thu_tu_hien_thi, is_active, mau_hien_thi, icon, tao_boi, cap_nhat_boi, ngay_tao, ngay_cap_nhat) FROM stdin;
\.


--
-- Data for Name: danh_muc_su_kien; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.danh_muc_su_kien (id, ma_su_kien, ten_su_kien, loai, mo_ta, so_tien_mac_dinh, trang_thai, ngay_tao, ngay_cap_nhat) FROM stdin;
\.


--
-- Data for Name: don_nghi_phep; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.don_nghi_phep (id, ma_don, nhan_vien_id, phong_ban_id, loai_nghi_id, tu_ngay, den_ngay, so_ngay_nghi, ly_do, tep_dinh_kem_url, trang_thai, nguoi_duyet_id, ngay_duyet, ly_do_tu_choi, tao_boi, ngay_tao, ngay_cap_nhat) FROM stdin;
\.


--
-- Data for Name: don_vi_con; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.don_vi_con (id, phong_ban_id, ma_don_vi, ten_don_vi, loai_don_vi, trang_thai, tao_boi, ngay_tao) FROM stdin;
\.


--
-- Data for Name: don_yeu_cau; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.don_yeu_cau (id, ma_don, nhan_vien_id, phong_ban_id, loai_yeu_cau_id, ngay_yeu_cau, gio_bat_dau, gio_ket_thuc, so_gio, dia_diem, ly_do, tep_dinh_kem_url, trang_thai, nguoi_duyet_1_id, ngay_duyet_1, ghi_chu_duyet_1, nguoi_duyet_2_id, ngay_duyet_2, ghi_chu_duyet_2, ly_do_tu_choi, is_override, ly_do_override, nguoi_override_id, tao_boi, ngay_tao, ngay_cap_nhat) FROM stdin;
\.


--
-- Data for Name: giao_hang; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.giao_hang (id, ngay, nhan_vien_id, khoi_luong_thanh_cong, so_lan_tre_gio, so_lan_khong_lay_phieu, ghi_chu, nguon_du_lieu, import_id, khoa_sua, tao_boi, tao_luc, cap_nhat_boi, cap_nhat_luc) FROM stdin;
1	2025-06-02	65	120.60	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
2	2025-06-03	65	470.94	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
3	2025-06-04	65	441.76	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
4	2025-06-05	65	210.22	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
5	2025-06-06	65	151.27	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
6	2025-06-07	65	282.61	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
7	2025-06-09	65	189.47	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
8	2025-06-10	65	187.27	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
9	2025-06-11	65	339.37	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
10	2025-06-12	65	212.72	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
11	2025-06-13	65	142.49	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
12	2025-06-14	65	435.41	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
13	2025-06-16	65	322.52	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
14	2025-06-17	65	400.78	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
15	2025-06-18	65	146.34	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
16	2025-06-19	65	163.31	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
17	2025-06-20	65	330.74	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
18	2025-06-21	65	149.60	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
19	2025-06-23	65	122.93	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
20	2025-06-24	65	397.73	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
21	2025-06-25	65	345.06	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
22	2025-06-26	65	261.05	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
23	2025-06-27	65	361.20	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
24	2025-06-28	65	457.43	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
25	2025-07-01	65	442.13	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
26	2025-07-02	65	191.47	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
27	2025-07-03	65	402.93	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
28	2025-07-04	65	297.55	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
29	2025-07-05	65	216.02	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
30	2025-07-07	65	473.77	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
31	2025-07-08	65	364.75	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
32	2025-07-09	65	359.76	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
33	2025-07-10	65	232.12	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
34	2025-07-11	65	384.40	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
35	2025-07-12	65	386.60	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
36	2025-07-14	65	444.47	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
37	2025-07-15	65	363.11	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
38	2025-07-16	65	136.79	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
39	2025-07-17	65	180.38	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
40	2025-07-18	65	182.18	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
41	2025-07-19	65	224.72	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
42	2025-07-21	65	478.49	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
43	2025-07-22	65	317.40	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
44	2025-07-23	65	283.67	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
45	2025-07-24	65	362.40	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
46	2025-07-25	65	151.54	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
47	2025-07-26	65	378.17	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
48	2025-07-28	65	466.60	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
49	2025-08-01	65	377.95	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
50	2025-08-02	65	395.35	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
51	2025-08-04	65	362.60	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
52	2025-08-05	65	342.70	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
53	2025-08-06	65	186.91	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
54	2025-08-07	65	496.76	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
55	2025-08-08	65	354.58	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
56	2025-08-09	65	309.54	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
57	2025-08-11	65	198.81	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
58	2025-08-12	65	355.74	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
59	2025-08-13	65	139.31	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
60	2025-08-14	65	133.36	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
61	2025-08-15	65	467.59	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
62	2025-08-16	65	421.80	1	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
63	2025-08-18	65	401.78	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
64	2025-08-19	65	145.77	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
65	2025-08-20	65	477.26	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
66	2025-08-21	65	300.46	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
67	2025-08-22	65	149.11	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
68	2025-08-23	65	184.64	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
69	2025-08-25	65	229.86	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
70	2025-08-26	65	204.05	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
71	2025-08-27	65	172.41	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
72	2025-08-28	65	325.66	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
73	2025-09-01	65	388.19	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
74	2025-09-02	65	110.13	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
75	2025-09-03	65	499.79	3	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
76	2025-09-04	65	201.59	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
77	2025-09-05	65	367.43	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
78	2025-09-06	65	113.48	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
79	2025-09-08	65	487.21	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
80	2025-09-09	65	335.50	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
81	2025-09-10	65	497.26	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
82	2025-09-11	65	243.63	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
83	2025-09-12	65	203.23	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
84	2025-09-13	65	212.42	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
85	2025-09-15	65	361.38	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
86	2025-09-16	65	422.25	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
87	2025-09-17	65	148.17	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
88	2025-09-18	65	345.25	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
89	2025-09-19	65	359.41	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
90	2025-09-20	65	358.97	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
91	2025-09-22	65	324.20	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
92	2025-09-23	65	116.69	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
93	2025-09-24	65	312.93	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
94	2025-09-25	65	405.03	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
95	2025-09-26	65	163.96	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
96	2025-09-27	65	324.94	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
97	2025-10-01	65	159.50	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
98	2025-10-02	65	326.06	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
99	2025-10-03	65	150.11	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
100	2025-10-04	65	338.48	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
101	2025-10-06	65	410.80	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
102	2025-10-07	65	498.26	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
103	2025-10-08	65	362.30	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
104	2025-10-09	65	188.96	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
105	2025-10-10	65	134.58	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
106	2025-10-11	65	296.62	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
107	2025-10-13	65	137.88	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
108	2025-10-14	65	299.87	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
109	2025-10-15	65	244.85	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
110	2025-10-16	65	420.80	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
111	2025-10-17	65	480.27	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
112	2025-10-18	65	270.64	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
113	2025-10-20	65	115.67	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
114	2025-10-21	65	315.65	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
115	2025-10-22	65	297.69	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
116	2025-10-23	65	126.06	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
117	2025-10-24	65	457.84	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
118	2025-10-25	65	344.03	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
119	2025-10-27	65	141.53	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
120	2025-10-28	65	239.96	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
121	2025-11-01	65	274.92	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
122	2025-11-03	65	290.37	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
123	2025-11-04	65	455.28	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
124	2025-11-05	65	392.47	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
125	2025-11-06	65	112.98	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
126	2025-11-07	65	172.59	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
127	2025-11-08	65	259.94	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
128	2025-11-10	65	302.94	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
129	2025-11-11	65	305.57	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
130	2025-11-12	65	269.02	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
131	2025-11-13	65	398.91	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
132	2025-11-14	65	469.51	3	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
133	2025-11-15	65	466.74	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
134	2025-11-17	65	164.34	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
135	2025-11-18	65	263.51	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
136	2025-11-19	65	139.05	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
137	2025-11-20	65	296.06	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
138	2025-11-21	65	259.04	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
139	2025-11-22	65	283.90	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
140	2025-11-24	65	374.94	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
141	2025-11-25	65	372.62	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
142	2025-11-26	65	175.46	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
143	2025-11-27	65	207.13	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
144	2025-11-28	65	154.35	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
145	2025-12-01	65	110.38	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
146	2025-12-02	65	281.26	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
147	2025-12-03	65	211.42	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
148	2025-12-04	65	144.33	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
149	2025-12-05	65	159.96	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
150	2025-12-06	65	467.04	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
151	2025-12-08	65	238.48	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
152	2025-12-09	65	160.37	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
153	2025-12-10	65	170.86	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
154	2025-12-11	65	131.83	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
155	2025-12-12	65	135.91	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
156	2025-12-13	65	163.97	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
157	2025-12-15	65	415.58	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
158	2025-12-16	65	227.96	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
159	2025-12-17	65	412.44	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
160	2025-12-18	65	287.19	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
161	2025-12-19	65	233.98	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
162	2025-12-20	65	170.51	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
163	2025-12-22	65	253.08	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
164	2025-12-23	65	275.28	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
165	2025-12-24	65	463.55	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
166	2025-12-25	65	417.06	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
167	2025-12-26	65	492.32	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
168	2025-12-27	65	217.95	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
169	2025-06-02	66	150.11	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
170	2025-06-03	66	359.38	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
171	2025-06-04	66	237.33	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
172	2025-06-05	66	195.13	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
173	2025-06-06	66	114.34	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
174	2025-06-07	66	438.42	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
175	2025-06-09	66	138.34	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
176	2025-06-10	66	454.65	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
177	2025-06-11	66	208.76	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
178	2025-06-12	66	422.96	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
179	2025-06-13	66	226.22	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
180	2025-06-14	66	206.81	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
181	2025-06-16	66	406.04	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
182	2025-06-17	66	208.59	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
183	2025-06-18	66	254.61	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
184	2025-06-19	66	311.66	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
185	2025-06-20	66	327.47	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
186	2025-06-21	66	327.47	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
187	2025-06-23	66	303.38	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
188	2025-06-24	66	134.39	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
189	2025-06-25	66	302.76	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
190	2025-06-26	66	368.46	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
191	2025-06-27	66	443.16	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
192	2025-06-28	66	230.22	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
193	2025-07-01	66	485.78	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
194	2025-07-02	66	242.09	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
195	2025-07-03	66	215.84	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
196	2025-07-04	66	251.85	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
197	2025-07-05	66	438.56	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
198	2025-07-07	66	332.26	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
199	2025-07-08	66	440.60	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
200	2025-07-09	66	167.05	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
201	2025-07-10	66	260.83	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
202	2025-07-11	66	232.83	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
203	2025-07-12	66	236.72	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
204	2025-07-14	66	499.94	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
205	2025-07-15	66	441.33	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
206	2025-07-16	66	199.21	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
207	2025-07-17	66	156.66	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
208	2025-07-18	66	206.79	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
209	2025-07-19	66	173.07	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
210	2025-07-21	66	491.48	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
211	2025-07-22	66	498.92	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
212	2025-07-23	66	205.19	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
213	2025-07-24	66	196.62	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
214	2025-07-25	66	393.09	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
215	2025-07-26	66	340.18	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
216	2025-07-28	66	295.74	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
217	2025-08-01	66	327.30	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
218	2025-08-02	66	375.04	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
219	2025-08-04	66	357.83	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
220	2025-08-05	66	467.00	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
221	2025-08-06	66	446.79	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
222	2025-08-07	66	195.35	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
223	2025-08-08	66	130.64	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
224	2025-08-09	66	422.47	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
225	2025-08-11	66	180.39	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
226	2025-08-12	66	290.28	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
227	2025-08-13	66	147.02	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
228	2025-08-14	66	179.99	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
229	2025-08-15	66	459.14	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
230	2025-08-16	66	248.25	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
231	2025-08-18	66	273.93	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
232	2025-08-19	66	171.25	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
233	2025-08-20	66	139.97	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
234	2025-08-21	66	339.69	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
235	2025-08-22	66	280.56	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
236	2025-08-23	66	367.84	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
237	2025-08-25	66	490.81	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
238	2025-08-26	66	434.00	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
239	2025-08-27	66	385.19	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
240	2025-08-28	66	342.13	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
241	2025-09-01	66	104.81	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
242	2025-09-02	66	275.86	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
243	2025-09-03	66	192.08	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
244	2025-09-04	66	264.24	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
245	2025-09-05	66	171.27	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
246	2025-09-06	66	319.34	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
247	2025-09-08	66	498.14	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
248	2025-09-09	66	493.50	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
249	2025-09-10	66	204.69	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
250	2025-09-11	66	350.46	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
251	2025-09-12	66	430.80	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
252	2025-09-13	66	423.86	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
253	2025-09-15	66	110.68	2	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
254	2025-09-16	66	101.48	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
255	2025-09-17	66	374.88	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
256	2025-09-18	66	467.45	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
257	2025-09-19	66	109.28	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
258	2025-09-20	66	231.17	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
259	2025-09-22	66	321.08	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
260	2025-09-23	66	455.76	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
261	2025-09-24	66	348.12	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
262	2025-09-25	66	284.55	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
263	2025-09-26	66	223.14	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
264	2025-09-27	66	356.61	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
265	2025-10-01	66	277.27	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
266	2025-10-02	66	189.19	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
267	2025-10-03	66	494.97	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
268	2025-10-04	66	384.71	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
269	2025-10-06	66	265.81	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
270	2025-10-07	66	323.68	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
271	2025-10-08	66	321.82	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
272	2025-10-09	66	127.06	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
273	2025-10-10	66	160.49	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
274	2025-10-11	66	410.93	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
275	2025-10-13	66	339.48	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
276	2025-10-14	66	173.59	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
277	2025-10-15	66	201.08	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
278	2025-10-16	66	291.58	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
279	2025-10-17	66	211.15	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
280	2025-10-18	66	460.78	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
281	2025-10-20	66	368.56	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
282	2025-10-21	66	105.92	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
283	2025-10-22	66	417.52	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
284	2025-10-23	66	331.74	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
285	2025-10-24	66	499.37	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
286	2025-10-25	66	181.50	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
287	2025-10-27	66	204.69	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
288	2025-10-28	66	194.40	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
289	2025-11-01	66	324.08	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
290	2025-11-03	66	279.68	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
291	2025-11-04	66	138.05	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
292	2025-11-05	66	410.22	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
293	2025-11-06	66	269.09	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
294	2025-11-07	66	221.49	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
295	2025-11-08	66	239.32	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
296	2025-11-10	66	274.11	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
297	2025-11-11	66	471.85	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
298	2025-11-12	66	331.70	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
299	2025-11-13	66	134.11	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
300	2025-11-14	66	301.78	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
301	2025-11-15	66	235.70	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
302	2025-11-17	66	352.01	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
303	2025-11-18	66	434.66	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
304	2025-11-19	66	446.26	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
305	2025-11-20	66	107.41	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
306	2025-11-21	66	117.28	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
307	2025-11-22	66	113.35	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
308	2025-11-24	66	306.69	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
309	2025-11-25	66	327.56	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
310	2025-11-26	66	477.27	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
311	2025-11-27	66	229.55	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
312	2025-11-28	66	137.81	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
313	2025-12-01	66	239.70	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
314	2025-12-02	66	234.01	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
315	2025-12-03	66	359.43	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
316	2025-12-04	66	214.93	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
317	2025-12-05	66	498.44	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
318	2025-12-06	66	431.87	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
319	2025-12-08	66	371.86	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
320	2025-12-09	66	354.08	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
321	2025-12-10	66	304.25	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
322	2025-12-11	66	202.37	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
323	2025-12-12	66	287.60	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
324	2025-12-13	66	106.26	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
325	2025-12-15	66	244.53	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
326	2025-12-16	66	434.11	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
327	2025-12-17	66	444.36	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
328	2025-12-18	66	498.30	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
329	2025-12-19	66	161.86	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
330	2025-12-20	66	414.82	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
331	2025-12-22	66	308.45	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
332	2025-12-23	66	222.07	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
333	2025-12-24	66	334.56	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
334	2025-12-25	66	129.66	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
335	2025-12-26	66	231.44	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
336	2025-12-27	66	410.50	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
337	2025-06-02	67	133.51	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
338	2025-06-03	67	221.93	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
339	2025-06-04	67	303.54	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
340	2025-06-05	67	139.26	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
341	2025-06-06	67	218.84	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
342	2025-06-07	67	388.65	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
343	2025-06-09	67	344.25	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
344	2025-06-10	67	237.27	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
345	2025-06-11	67	427.01	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
346	2025-06-12	67	254.09	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
347	2025-06-13	67	393.82	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
348	2025-06-14	67	293.07	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
349	2025-06-16	67	396.08	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
350	2025-06-17	67	442.73	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
351	2025-06-18	67	244.24	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
352	2025-06-19	67	154.58	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
353	2025-06-20	67	468.00	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
354	2025-06-21	67	381.12	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
355	2025-06-23	67	359.62	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
356	2025-06-24	67	140.78	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
357	2025-06-25	67	354.14	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
358	2025-06-26	67	254.06	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
359	2025-06-27	67	175.57	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
360	2025-06-28	67	271.37	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
361	2025-07-01	67	397.04	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
362	2025-07-02	67	422.93	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
363	2025-07-03	67	327.93	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
364	2025-07-04	67	150.08	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
365	2025-07-05	67	238.71	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
366	2025-07-07	67	215.77	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
367	2025-07-08	67	427.09	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
368	2025-07-09	67	479.24	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
369	2025-07-10	67	387.22	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
370	2025-07-11	67	280.24	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
371	2025-07-12	67	301.25	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
372	2025-07-14	67	491.06	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
373	2025-07-15	67	309.09	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
374	2025-07-16	67	143.10	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
375	2025-07-17	67	398.60	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
376	2025-07-18	67	113.07	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
377	2025-07-19	67	402.10	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
378	2025-07-21	67	175.33	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
379	2025-07-22	67	439.81	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
380	2025-07-23	67	317.56	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
381	2025-07-24	67	303.50	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
382	2025-07-25	67	405.98	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
383	2025-07-26	67	325.75	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
384	2025-07-28	67	299.91	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
385	2025-08-01	67	177.43	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
386	2025-08-02	67	337.73	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
387	2025-08-04	67	260.82	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
388	2025-08-05	67	429.69	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
389	2025-08-06	67	397.20	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
390	2025-08-07	67	443.12	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
391	2025-08-08	67	433.36	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
392	2025-08-09	67	246.57	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
393	2025-08-11	67	348.77	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
394	2025-08-12	67	475.49	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
395	2025-08-13	67	144.08	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
396	2025-08-14	67	468.50	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
397	2025-08-15	67	451.15	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
398	2025-08-16	67	210.75	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
399	2025-08-18	67	388.20	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
400	2025-08-19	67	154.82	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
401	2025-08-20	67	163.78	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
402	2025-08-21	67	261.01	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
403	2025-08-22	67	282.58	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
404	2025-08-23	67	252.03	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
405	2025-08-25	67	165.12	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
406	2025-08-26	67	412.74	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
407	2025-08-27	67	213.56	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
408	2025-08-28	67	337.77	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
409	2025-09-01	67	393.52	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
410	2025-09-02	67	335.59	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
411	2025-09-03	67	429.85	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
412	2025-09-04	67	139.25	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
413	2025-09-05	67	487.39	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
414	2025-09-06	67	443.63	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
415	2025-09-08	67	361.20	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
416	2025-09-09	67	354.55	1	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
417	2025-09-10	67	388.46	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
418	2025-09-11	67	215.80	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
419	2025-09-12	67	150.18	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
420	2025-09-13	67	459.51	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
421	2025-09-15	67	224.48	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
422	2025-09-16	67	384.14	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
423	2025-09-17	67	395.50	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
424	2025-09-18	67	188.04	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
425	2025-09-19	67	220.14	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
426	2025-09-20	67	422.16	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
427	2025-09-22	67	215.11	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
428	2025-09-23	67	426.76	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
429	2025-09-24	67	489.26	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
430	2025-09-25	67	386.40	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
431	2025-09-26	67	360.72	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
432	2025-09-27	67	224.64	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
433	2025-10-01	67	322.04	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
434	2025-10-02	67	388.58	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
435	2025-10-03	67	140.36	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
436	2025-10-04	67	227.13	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
437	2025-10-06	67	199.58	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
438	2025-10-07	67	306.37	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
439	2025-10-08	67	308.78	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
440	2025-10-09	67	314.52	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
441	2025-10-10	67	244.52	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
442	2025-10-11	67	389.29	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
443	2025-10-13	67	173.99	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
444	2025-10-14	67	207.24	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
445	2025-10-15	67	203.45	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
446	2025-10-16	67	467.50	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
447	2025-10-17	67	254.78	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
448	2025-10-18	67	127.17	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
449	2025-10-20	67	442.44	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
450	2025-10-21	67	449.80	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
451	2025-10-22	67	374.49	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
452	2025-10-23	67	278.55	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
453	2025-10-24	67	281.20	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
454	2025-10-25	67	368.75	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
455	2025-10-27	67	223.23	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
456	2025-10-28	67	409.71	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
457	2025-11-01	67	447.69	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
458	2025-11-03	67	175.90	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
459	2025-11-04	67	162.23	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
460	2025-11-05	67	337.08	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
461	2025-11-06	67	215.61	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
462	2025-11-07	67	349.04	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
463	2025-11-08	67	449.33	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
464	2025-11-10	67	425.59	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
465	2025-11-11	67	400.32	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
466	2025-11-12	67	373.59	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
467	2025-11-13	67	361.04	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
468	2025-11-14	67	478.96	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
469	2025-11-15	67	313.05	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
470	2025-11-17	67	140.83	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
471	2025-11-18	67	384.78	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
472	2025-11-19	67	468.68	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
473	2025-11-20	67	292.83	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
474	2025-11-21	67	480.01	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
475	2025-11-22	67	241.55	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
476	2025-11-24	67	174.69	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
477	2025-11-25	67	184.57	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
478	2025-11-26	67	126.32	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
479	2025-11-27	67	187.97	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
480	2025-11-28	67	228.82	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
481	2025-12-01	67	296.55	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
482	2025-12-02	67	139.10	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
483	2025-12-03	67	340.83	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
484	2025-12-04	67	381.80	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
485	2025-12-05	67	310.51	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
486	2025-12-06	67	489.15	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
487	2025-12-08	67	213.77	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
488	2025-12-09	67	279.22	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
489	2025-12-10	67	487.48	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
490	2025-12-11	67	464.59	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
491	2025-12-12	67	302.31	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
492	2025-12-13	67	406.48	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
493	2025-12-15	67	399.19	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
494	2025-12-16	67	150.26	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
495	2025-12-17	67	138.63	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
496	2025-12-18	67	105.65	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
497	2025-12-19	67	477.70	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
498	2025-12-20	67	450.15	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
499	2025-12-22	67	190.09	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
500	2025-12-23	67	115.00	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
501	2025-12-24	67	290.54	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
502	2025-12-25	67	366.74	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
503	2025-12-26	67	297.95	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
504	2025-12-27	67	324.41	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
505	2025-06-02	68	215.80	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
506	2025-06-03	68	191.80	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
507	2025-06-04	68	318.91	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
508	2025-06-05	68	285.58	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
509	2025-06-06	68	193.99	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
510	2025-06-07	68	468.14	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
511	2025-06-09	68	210.52	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
512	2025-06-10	68	121.92	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
513	2025-06-11	68	129.37	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
514	2025-06-12	68	113.30	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
515	2025-06-13	68	110.56	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
516	2025-06-14	68	250.43	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
517	2025-06-16	68	371.09	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
518	2025-06-17	68	491.02	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
519	2025-06-18	68	327.63	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
520	2025-06-19	68	181.21	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
521	2025-06-20	68	489.72	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
522	2025-06-21	68	206.66	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
523	2025-06-23	68	162.97	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
524	2025-06-24	68	398.48	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
525	2025-06-25	68	359.54	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
526	2025-06-26	68	309.07	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
527	2025-06-27	68	373.70	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
528	2025-06-28	68	349.73	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
529	2025-07-01	68	199.00	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
530	2025-07-02	68	371.02	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
531	2025-07-03	68	432.14	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
532	2025-07-04	68	426.80	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
533	2025-07-05	68	465.50	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
534	2025-07-07	68	363.27	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
535	2025-07-08	68	293.79	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
536	2025-07-09	68	266.66	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
537	2025-07-10	68	290.30	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
538	2025-07-11	68	266.51	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
539	2025-07-12	68	483.71	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
540	2025-07-14	68	107.57	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
541	2025-07-15	68	372.07	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
542	2025-07-16	68	123.33	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
543	2025-07-17	68	272.85	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
544	2025-07-18	68	287.32	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
545	2025-07-19	68	446.57	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
546	2025-07-21	68	265.28	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
547	2025-07-22	68	242.41	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
548	2025-07-23	68	152.18	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
549	2025-07-24	68	163.34	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
550	2025-07-25	68	372.16	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
551	2025-07-26	68	308.36	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
552	2025-07-28	68	385.42	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
553	2025-08-01	68	153.23	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
554	2025-08-02	68	329.47	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
555	2025-08-04	68	359.98	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
556	2025-08-05	68	135.92	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
557	2025-08-06	68	345.19	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
558	2025-08-07	68	470.21	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
559	2025-08-08	68	332.79	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
560	2025-08-09	68	499.31	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
561	2025-08-11	68	442.61	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
562	2025-08-12	68	123.79	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
563	2025-08-13	68	225.60	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
564	2025-08-14	68	382.99	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
565	2025-08-15	68	167.22	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
566	2025-08-16	68	311.31	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
567	2025-08-18	68	247.01	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
568	2025-08-19	68	317.22	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
569	2025-08-20	68	321.76	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
570	2025-08-21	68	254.35	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
571	2025-08-22	68	230.45	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
572	2025-08-23	68	216.90	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
573	2025-08-25	68	479.02	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
574	2025-08-26	68	369.54	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
575	2025-08-27	68	475.99	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
576	2025-08-28	68	237.69	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
577	2025-09-01	68	235.42	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
578	2025-09-02	68	258.29	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
579	2025-09-03	68	202.09	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
580	2025-09-04	68	469.65	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
581	2025-09-05	68	267.57	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
582	2025-09-06	68	491.96	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
583	2025-09-08	68	149.75	2	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
584	2025-09-09	68	457.18	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
585	2025-09-10	68	449.65	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
586	2025-09-11	68	150.65	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
587	2025-09-12	68	310.45	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
588	2025-09-13	68	400.89	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
589	2025-09-15	68	375.63	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
590	2025-09-16	68	287.34	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
591	2025-09-17	68	332.04	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
592	2025-09-18	68	485.44	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
593	2025-09-19	68	110.09	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
594	2025-09-20	68	288.72	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
595	2025-09-22	68	218.88	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
596	2025-09-23	68	268.64	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
597	2025-09-24	68	203.07	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
598	2025-09-25	68	201.64	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
599	2025-09-26	68	310.54	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
600	2025-09-27	68	331.55	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
601	2025-10-01	68	156.91	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
602	2025-10-02	68	221.36	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
603	2025-10-03	68	155.20	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
604	2025-10-04	68	351.84	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
605	2025-10-06	68	497.83	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
606	2025-10-07	68	214.72	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
607	2025-10-08	68	493.02	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
608	2025-10-09	68	468.22	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
609	2025-10-10	68	448.44	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
610	2025-10-11	68	140.48	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
611	2025-10-13	68	314.69	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
612	2025-10-14	68	419.40	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
613	2025-10-15	68	370.10	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
614	2025-10-16	68	354.61	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
615	2025-10-17	68	175.52	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
616	2025-10-18	68	114.39	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
617	2025-10-20	68	342.39	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
618	2025-10-21	68	491.18	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
619	2025-10-22	68	226.56	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
620	2025-10-23	68	297.78	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
621	2025-10-24	68	279.24	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
622	2025-10-25	68	313.66	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
623	2025-10-27	68	306.91	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
624	2025-10-28	68	135.84	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
625	2025-11-01	68	269.56	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
626	2025-11-03	68	346.37	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
627	2025-11-04	68	224.36	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
628	2025-11-05	68	436.51	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
629	2025-11-06	68	270.33	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
630	2025-11-07	68	367.92	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
631	2025-11-08	68	307.10	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
632	2025-11-10	68	200.71	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
633	2025-11-11	68	458.48	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
634	2025-11-12	68	328.38	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
635	2025-11-13	68	144.66	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
636	2025-11-14	68	410.23	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
637	2025-11-15	68	234.76	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
638	2025-11-17	68	237.11	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
639	2025-11-18	68	238.37	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
640	2025-11-19	68	460.20	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
641	2025-11-20	68	336.40	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
642	2025-11-21	68	348.36	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
643	2025-11-22	68	389.12	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
644	2025-11-24	68	352.53	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
645	2025-11-25	68	265.44	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
646	2025-11-26	68	415.09	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
647	2025-11-27	68	336.87	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
648	2025-11-28	68	309.68	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
649	2025-12-01	68	194.91	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
650	2025-12-02	68	456.64	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
651	2025-12-03	68	264.40	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
652	2025-12-04	68	425.52	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
653	2025-12-05	68	193.48	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
654	2025-12-06	68	335.34	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
655	2025-12-08	68	153.80	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
656	2025-12-09	68	319.20	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
657	2025-12-10	68	137.81	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
658	2025-12-11	68	268.62	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
659	2025-12-12	68	142.02	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
660	2025-12-13	68	159.24	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
661	2025-12-15	68	134.60	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
662	2025-12-16	68	159.95	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
663	2025-12-17	68	333.15	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
664	2025-12-18	68	173.65	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
665	2025-12-19	68	280.60	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
666	2025-12-20	68	480.45	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
667	2025-12-22	68	311.91	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
668	2025-12-23	68	414.87	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
669	2025-12-24	68	208.19	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
670	2025-12-25	68	110.13	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
671	2025-12-26	68	136.69	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
672	2025-12-27	68	370.02	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
673	2025-06-02	71	398.71	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
674	2025-06-03	71	190.21	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
675	2025-06-04	71	381.92	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
676	2025-06-05	71	180.72	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
677	2025-06-06	71	306.78	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
678	2025-06-07	71	200.60	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
679	2025-06-09	71	221.20	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
680	2025-06-10	71	484.39	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
681	2025-06-11	71	229.51	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
682	2025-06-12	71	430.12	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
683	2025-06-13	71	352.11	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
684	2025-06-14	71	172.81	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
685	2025-06-16	71	268.83	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
686	2025-06-17	71	137.96	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
687	2025-06-18	71	141.33	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
688	2025-06-19	71	296.06	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
689	2025-06-20	71	461.83	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
690	2025-06-21	71	230.13	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
691	2025-06-23	71	104.15	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
692	2025-06-24	71	181.77	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
693	2025-06-25	71	305.72	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
694	2025-06-26	71	197.34	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
695	2025-06-27	71	301.16	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
696	2025-06-28	71	383.50	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
697	2025-07-01	71	173.12	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
698	2025-07-02	71	181.21	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
699	2025-07-03	71	116.92	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
700	2025-07-04	71	357.63	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
701	2025-07-05	71	248.98	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
702	2025-07-07	71	170.85	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
703	2025-07-08	71	261.81	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
704	2025-07-09	71	362.33	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
705	2025-07-10	71	262.35	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
706	2025-07-11	71	276.33	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
707	2025-07-12	71	333.45	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
708	2025-07-14	71	279.67	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
709	2025-07-15	71	408.90	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
710	2025-07-16	71	451.12	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
711	2025-07-17	71	281.34	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
712	2025-07-18	71	140.73	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
713	2025-07-19	71	468.94	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
714	2025-07-21	71	367.26	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
715	2025-07-22	71	265.58	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
716	2025-07-23	71	125.75	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
717	2025-07-24	71	182.25	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
718	2025-07-25	71	456.10	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
719	2025-07-26	71	120.93	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
720	2025-07-28	71	469.31	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
721	2025-08-01	71	255.70	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
722	2025-08-02	71	120.08	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
723	2025-08-04	71	129.94	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
724	2025-08-05	71	446.50	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
725	2025-08-06	71	431.99	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
726	2025-08-07	71	396.40	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
727	2025-08-08	71	158.55	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
728	2025-08-09	71	196.36	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
729	2025-08-11	71	418.03	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
730	2025-08-12	71	129.75	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
731	2025-08-13	71	152.34	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
732	2025-08-14	71	441.26	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
733	2025-08-15	71	274.21	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
734	2025-08-16	71	269.35	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
735	2025-08-18	71	447.77	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
736	2025-08-19	71	459.62	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
737	2025-08-20	71	447.19	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
738	2025-08-21	71	246.10	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
739	2025-08-22	71	203.85	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
740	2025-08-23	71	493.99	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
741	2025-08-25	71	126.51	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
742	2025-08-26	71	372.15	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
743	2025-08-27	71	418.03	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
744	2025-08-28	71	382.95	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
745	2025-09-01	71	178.85	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
746	2025-09-02	71	296.44	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
747	2025-09-03	71	423.42	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
748	2025-09-04	71	472.82	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
749	2025-09-05	71	146.83	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
750	2025-09-06	71	482.49	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
751	2025-09-08	71	196.53	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
752	2025-09-09	71	242.46	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
753	2025-09-10	71	323.68	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
754	2025-09-11	71	399.03	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
755	2025-09-12	71	181.30	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
756	2025-09-13	71	231.83	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
757	2025-09-15	71	470.07	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
758	2025-09-16	71	320.95	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
759	2025-09-17	71	446.88	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
760	2025-09-18	71	455.24	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
761	2025-09-19	71	499.34	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
762	2025-09-20	71	198.03	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
763	2025-09-22	71	126.42	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
764	2025-09-23	71	186.87	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
765	2025-09-24	71	448.66	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
766	2025-09-25	71	253.98	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
767	2025-09-26	71	146.79	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
768	2025-09-27	71	253.94	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
769	2025-10-01	71	323.57	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
770	2025-10-02	71	236.49	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
771	2025-10-03	71	123.42	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
772	2025-10-04	71	415.61	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
773	2025-10-06	71	219.34	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
774	2025-10-07	71	232.87	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
775	2025-10-08	71	381.67	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
776	2025-10-09	71	116.98	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
777	2025-10-10	71	197.51	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
778	2025-10-11	71	156.49	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
779	2025-10-13	71	392.27	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
780	2025-10-14	71	476.30	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
781	2025-10-15	71	114.03	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
782	2025-10-16	71	305.37	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
783	2025-10-17	71	201.53	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
784	2025-10-18	71	413.61	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
785	2025-10-20	71	430.90	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
786	2025-10-21	71	322.91	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
787	2025-10-22	71	258.76	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
788	2025-10-23	71	325.83	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
789	2025-10-24	71	159.66	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
790	2025-10-25	71	413.89	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
791	2025-10-27	71	166.81	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
792	2025-10-28	71	202.08	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
793	2025-11-01	71	108.67	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
794	2025-11-03	71	135.20	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
795	2025-11-04	71	242.67	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
796	2025-11-05	71	164.69	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
797	2025-11-06	71	285.53	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
798	2025-11-07	71	170.04	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
799	2025-11-08	71	209.58	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
800	2025-11-10	71	367.30	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
801	2025-11-11	71	401.99	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
802	2025-11-12	71	356.06	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
803	2025-11-13	71	402.38	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
804	2025-11-14	71	195.34	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
805	2025-11-15	71	327.45	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
806	2025-11-17	71	216.38	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
807	2025-11-18	71	165.25	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
808	2025-11-19	71	213.17	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
809	2025-11-20	71	447.22	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
810	2025-11-21	71	468.16	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
811	2025-11-22	71	328.39	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
812	2025-11-24	71	450.35	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
813	2025-11-25	71	297.03	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
814	2025-11-26	71	424.40	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
815	2025-11-27	71	336.43	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
816	2025-11-28	71	143.70	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
817	2025-12-01	71	172.92	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
818	2025-12-02	71	361.04	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
819	2025-12-03	71	295.08	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
820	2025-12-04	71	479.94	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
821	2025-12-05	71	284.01	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
822	2025-12-06	71	324.94	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
823	2025-12-08	71	299.71	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
824	2025-12-09	71	351.10	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
825	2025-12-10	71	400.29	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
826	2025-12-11	71	469.67	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
827	2025-12-12	71	220.28	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
828	2025-12-13	71	177.17	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
829	2025-12-15	71	353.45	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
830	2025-12-16	71	484.37	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
831	2025-12-17	71	137.14	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
832	2025-12-18	71	116.02	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
833	2025-12-19	71	114.85	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
834	2025-12-20	71	205.63	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
835	2025-12-22	71	370.37	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
836	2025-12-23	71	473.68	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
837	2025-12-24	71	296.37	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
838	2025-12-25	71	356.23	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
839	2025-12-26	71	296.88	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
840	2025-12-27	71	260.07	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
841	2025-06-02	72	411.53	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
842	2025-06-03	72	323.47	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
843	2025-06-04	72	456.23	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
844	2025-06-05	72	215.07	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
845	2025-06-06	72	441.25	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
846	2025-06-07	72	386.67	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
847	2025-06-09	72	268.60	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
848	2025-06-10	72	236.96	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
849	2025-06-11	72	495.96	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
850	2025-06-12	72	403.85	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
851	2025-06-13	72	210.86	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
852	2025-06-14	72	294.00	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
853	2025-06-16	72	281.37	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
854	2025-06-17	72	441.40	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
855	2025-06-18	72	119.23	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
856	2025-06-19	72	344.75	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
857	2025-06-20	72	258.35	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
858	2025-06-21	72	318.74	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
859	2025-06-23	72	411.39	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
860	2025-06-24	72	486.99	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
861	2025-06-25	72	321.42	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
862	2025-06-26	72	101.55	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
863	2025-06-27	72	451.63	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
864	2025-06-28	72	257.45	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
865	2025-07-01	72	354.93	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
866	2025-07-02	72	252.73	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
867	2025-07-03	72	419.17	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
868	2025-07-04	72	152.93	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
869	2025-07-05	72	379.02	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
870	2025-07-07	72	440.45	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
871	2025-07-08	72	427.86	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
872	2025-07-09	72	442.46	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
873	2025-07-10	72	480.90	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
874	2025-07-11	72	139.39	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
875	2025-07-12	72	481.81	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
876	2025-07-14	72	113.20	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
877	2025-07-15	72	381.17	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
878	2025-07-16	72	440.01	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
879	2025-07-17	72	334.54	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
880	2025-07-18	72	102.52	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
881	2025-07-19	72	323.76	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
882	2025-07-21	72	257.46	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
883	2025-07-22	72	219.25	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
884	2025-07-23	72	250.42	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
885	2025-07-24	72	297.38	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
886	2025-07-25	72	150.99	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
887	2025-07-26	72	106.45	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
888	2025-07-28	72	441.68	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
889	2025-08-01	72	440.19	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
890	2025-08-02	72	170.07	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
891	2025-08-04	72	237.82	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
892	2025-08-05	72	199.24	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
893	2025-08-06	72	380.18	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
894	2025-08-07	72	419.96	1	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
895	2025-08-08	72	246.85	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
896	2025-08-09	72	104.91	3	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
897	2025-08-11	72	396.08	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
898	2025-08-12	72	228.82	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
899	2025-08-13	72	327.20	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
900	2025-08-14	72	362.76	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
901	2025-08-15	72	490.97	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
902	2025-08-16	72	105.88	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
903	2025-08-18	72	298.73	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
904	2025-08-19	72	139.31	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
905	2025-08-20	72	428.81	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
906	2025-08-21	72	376.09	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
907	2025-08-22	72	383.92	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
908	2025-08-23	72	292.49	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
909	2025-08-25	72	250.94	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
910	2025-08-26	72	274.92	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
911	2025-08-27	72	208.85	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
912	2025-08-28	72	288.35	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
913	2025-09-01	72	318.12	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
914	2025-09-02	72	259.83	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
915	2025-09-03	72	337.78	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
916	2025-09-04	72	281.17	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
917	2025-09-05	72	284.82	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
918	2025-09-06	72	416.58	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
919	2025-09-08	72	459.54	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
920	2025-09-09	72	130.68	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
921	2025-09-10	72	466.67	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
922	2025-09-11	72	248.64	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
923	2025-09-12	72	390.10	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
924	2025-09-13	72	340.62	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
925	2025-09-15	72	480.03	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
926	2025-09-16	72	442.44	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
927	2025-09-17	72	109.09	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
928	2025-09-18	72	484.83	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
929	2025-09-19	72	476.06	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
930	2025-09-20	72	464.66	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
931	2025-09-22	72	274.06	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
932	2025-09-23	72	258.08	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
933	2025-09-24	72	443.15	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
934	2025-09-25	72	403.36	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
935	2025-09-26	72	335.90	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
936	2025-09-27	72	143.90	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
937	2025-10-01	72	188.98	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
938	2025-10-02	72	136.44	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
939	2025-10-03	72	316.13	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
940	2025-10-04	72	157.62	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
941	2025-10-06	72	280.56	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
942	2025-10-07	72	178.69	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
943	2025-10-08	72	143.00	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
944	2025-10-09	72	281.42	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
945	2025-10-10	72	271.15	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
946	2025-10-11	72	468.57	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
947	2025-10-13	72	416.34	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
948	2025-10-14	72	164.53	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
949	2025-10-15	72	140.88	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
950	2025-10-16	72	305.83	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
951	2025-10-17	72	231.17	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
952	2025-10-18	72	351.20	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
953	2025-10-20	72	354.92	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
954	2025-10-21	72	216.73	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
955	2025-10-22	72	334.43	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
956	2025-10-23	72	129.19	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
957	2025-10-24	72	427.51	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
958	2025-10-25	72	498.16	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
959	2025-10-27	72	477.23	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
960	2025-10-28	72	346.92	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
961	2025-11-01	72	211.08	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
962	2025-11-03	72	329.10	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
963	2025-11-04	72	322.31	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
964	2025-11-05	72	325.72	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
965	2025-11-06	72	200.26	0	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
966	2025-11-07	72	377.22	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
967	2025-11-08	72	407.29	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
968	2025-11-10	72	208.05	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
969	2025-11-11	72	325.38	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
970	2025-11-12	72	170.41	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
971	2025-11-13	72	278.85	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
972	2025-11-14	72	224.16	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
973	2025-11-15	72	265.03	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
974	2025-11-17	72	235.62	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
975	2025-11-18	72	332.87	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
976	2025-11-19	72	398.30	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
977	2025-11-20	72	381.85	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
978	2025-11-21	72	186.49	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
979	2025-11-22	72	332.87	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
980	2025-11-24	72	281.12	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
981	2025-11-25	72	135.96	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
982	2025-11-26	72	295.63	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
983	2025-11-27	72	148.98	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
984	2025-11-28	72	139.22	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
985	2025-12-01	72	297.16	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
986	2025-12-02	72	268.86	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
987	2025-12-03	72	441.19	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
988	2025-12-04	72	382.57	3	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
989	2025-12-05	72	213.76	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
990	2025-12-06	72	174.58	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
991	2025-12-08	72	158.50	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
992	2025-12-09	72	286.10	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
993	2025-12-10	72	262.65	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
994	2025-12-11	72	390.52	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
995	2025-12-12	72	335.33	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
996	2025-12-13	72	409.59	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
997	2025-12-15	72	136.27	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
998	2025-12-16	72	459.58	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
999	2025-12-17	72	440.58	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
1000	2025-12-18	72	429.71	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
1001	2025-12-19	72	367.56	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
1002	2025-12-20	72	162.01	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
1003	2025-12-22	72	208.45	1	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
1004	2025-12-23	72	373.49	1	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
1005	2025-12-24	72	131.50	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
1006	2025-12-25	72	355.50	0	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
1007	2025-12-26	72	286.09	2	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
1008	2025-12-27	72	327.21	0	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.705	\N	2026-01-16 03:38:21.705
1009	2026-01-01	65	148.19	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1010	2026-01-02	65	139.54	0	1	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1011	2026-01-03	65	140.81	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1012	2026-01-05	65	57.84	0	1	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1013	2026-01-06	65	105.60	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1014	2026-01-07	65	193.37	2	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1015	2026-01-08	65	191.88	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1016	2026-01-09	65	152.79	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1017	2026-01-10	65	143.16	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1018	2026-01-12	65	122.16	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1019	2026-01-13	65	126.49	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1020	2026-01-14	65	77.02	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1021	2026-01-15	65	169.84	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1022	2026-01-16	65	61.18	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1023	2026-01-17	65	73.38	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1024	2026-01-19	65	175.95	0	1	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1025	2026-01-20	65	150.85	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1026	2026-01-01	66	62.67	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1027	2026-01-02	66	116.38	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1028	2026-01-03	66	165.45	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1029	2026-01-05	66	164.60	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1030	2026-01-06	66	146.59	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1031	2026-01-07	66	141.37	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1032	2026-01-08	66	159.59	2	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1033	2026-01-09	66	180.16	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1034	2026-01-10	66	68.76	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1035	2026-01-12	66	149.70	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1036	2026-01-13	66	60.00	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1037	2026-01-14	66	102.53	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1038	2026-01-15	66	150.52	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1039	2026-01-16	66	105.93	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1040	2026-01-17	66	175.32	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1041	2026-01-19	66	177.87	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1042	2026-01-20	66	193.18	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1043	2026-01-01	67	74.14	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1044	2026-01-02	67	50.81	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1045	2026-01-03	67	81.33	2	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1046	2026-01-05	67	82.55	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1047	2026-01-06	67	170.81	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1048	2026-01-07	67	91.64	0	1	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1049	2026-01-08	67	195.93	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1050	2026-01-09	67	75.29	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1051	2026-01-10	67	139.83	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1052	2026-01-12	67	195.35	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1053	2026-01-13	67	137.43	0	1	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1054	2026-01-14	67	127.49	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1055	2026-01-15	67	121.43	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1056	2026-01-16	67	58.49	0	1	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1057	2026-01-17	67	196.21	2	1	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1058	2026-01-19	67	135.35	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1059	2026-01-20	67	93.87	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1060	2026-01-01	68	134.29	1	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1061	2026-01-02	68	180.55	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1062	2026-01-03	68	181.83	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1063	2026-01-05	68	197.44	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1064	2026-01-06	68	54.06	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1065	2026-01-07	68	79.62	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1066	2026-01-08	68	52.84	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1067	2026-01-09	68	181.48	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1068	2026-01-10	68	129.76	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1069	2026-01-12	68	120.27	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1070	2026-01-13	68	193.98	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1071	2026-01-14	68	133.29	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1072	2026-01-15	68	162.22	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1073	2026-01-16	68	66.73	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1074	2026-01-17	68	94.20	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1075	2026-01-19	68	198.57	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1076	2026-01-20	68	153.87	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1077	2026-01-01	71	168.13	0	1	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1078	2026-01-02	71	91.05	1	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1079	2026-01-03	71	94.32	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1080	2026-01-05	71	176.95	0	1	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1081	2026-01-06	71	85.61	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1082	2026-01-07	71	162.12	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1083	2026-01-08	71	52.65	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1084	2026-01-09	71	95.29	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1085	2026-01-10	71	77.06	0	1	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1086	2026-01-12	71	197.37	0	1	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1087	2026-01-13	71	135.71	2	1	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1088	2026-01-14	71	50.67	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1089	2026-01-15	71	198.23	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1090	2026-01-16	71	51.94	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1091	2026-01-17	71	73.55	1	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1092	2026-01-19	71	92.50	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1093	2026-01-20	71	100.27	2	1	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1094	2026-01-01	72	62.05	1	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1095	2026-01-02	72	126.66	0	1	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1096	2026-01-03	72	190.38	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1097	2026-01-05	72	125.18	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1098	2026-01-06	72	146.68	2	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1099	2026-01-07	72	131.99	0	1	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1100	2026-01-08	72	60.89	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1101	2026-01-09	72	75.98	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1102	2026-01-10	72	80.01	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1103	2026-01-12	72	54.84	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1104	2026-01-13	72	120.26	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1105	2026-01-14	72	92.03	2	1	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1106	2026-01-15	72	78.61	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1107	2026-01-16	72	145.11	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1108	2026-01-17	72	157.03	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1109	2026-01-19	72	101.39	1	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
1110	2026-01-20	72	84.64	0	0	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:38.758	\N	2026-01-20 07:51:38.758
\.


--
-- Data for Name: ket_qua_kpi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ket_qua_kpi (id, danh_gia_id, chi_tieu_id, ket_qua_dat, ty_le_dat, diem_quy_doi, ghi_chu, ngay_tao) FROM stdin;
\.


--
-- Data for Name: khoan_luong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.khoan_luong (id, ma_khoan, ten_khoan, loai, cach_tinh, chiu_thue, pham_vi_ap_dung, mo_ta, thu_tu, trang_thai, ngay_tao, ngay_cap_nhat) FROM stdin;
21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	LUONG_THANG_CO_DINH	t	\N		1	t	2026-01-15 03:53:27.281	2026-01-15 03:53:27.281
22	THUONG_HIEU_SUAT	Thưởng hiệu suất	THU_NHAP	LUONG_THANG_CO_DINH	t	\N		2	t	2026-01-15 03:53:27.281	2026-01-15 03:53:27.281
23	PHU_CAP_XANG_XE	Phụ cấp xăng xe	THU_NHAP	LUONG_THANG_CO_DINH	f	\N		3	t	2026-01-15 03:53:27.281	2026-01-15 03:53:27.281
24	PHU_CAP_DIEN_THOAI	Phụ cấp điện thoại	THU_NHAP	LUONG_THANG_CO_DINH	f	\N		4	t	2026-01-15 03:53:27.281	2026-01-15 03:53:27.281
25	HO_TRO_CHUYEN_CAN	Hỗ trợ chuyên cần	THU_NHAP	LUONG_THANG_CO_DINH	f	\N		5	t	2026-01-15 03:53:27.281	2026-01-15 03:53:27.281
26	HO_TRO_AN_CA	Hỗ trợ ăn ca	THU_NHAP	LUONG_THANG_CO_DINH	f	\N		6	t	2026-01-15 03:53:27.281	2026-01-15 03:53:27.281
27	THUONG_KINH_DOANH	Thưởng kinh doanh	THU_NHAP	LUONG_THANG_CO_DINH	t	\N		7	t	2026-01-15 03:53:27.281	2026-01-15 03:53:27.281
28	PHU_CAP_KHAC	Phụ cấp khác	THU_NHAP	LUONG_THANG_CO_DINH	f	\N		8	t	2026-01-15 03:53:27.281	2026-01-15 03:53:27.281
29	PHU_CAP_CHUC_VU	Phụ cấp chức vụ	THU_NHAP	LUONG_THANG_CO_DINH	t	\N		9	t	2026-01-15 03:53:27.281	2026-01-15 03:53:27.281
30	PHU_CAP_THAM_NIEN	Phụ cấp thâm niên	THU_NHAP	LUONG_THANG_CO_DINH	t	\N		10	t	2026-01-15 03:53:27.281	2026-01-15 03:53:27.281
31	BHXH_NV	BHXH/BHYT/BHTN (NV đóng)	KHAU_TRU	LUONG_THANG_CO_DINH	f	\N		100	t	2026-01-15 03:53:27.281	2026-01-15 03:53:27.281
32	BHXH_NLD	BHXH (8%)	KHAU_TRU	LUONG_THANG_CO_DINH	f	\N		101	t	2026-01-15 03:53:27.281	2026-01-15 03:53:27.281
33	BHYT_NLD	BHYT (1.5%)	KHAU_TRU	LUONG_THANG_CO_DINH	f	\N		102	t	2026-01-15 03:53:27.281	2026-01-15 03:53:27.281
34	BHTN_NLD	BHTN (1%)	KHAU_TRU	LUONG_THANG_CO_DINH	f	\N		103	t	2026-01-15 03:53:27.281	2026-01-15 03:53:27.281
35	THUE_TNCN	Thuế TNCN	KHAU_TRU	LUONG_THANG_CO_DINH	f	\N		104	t	2026-01-15 03:53:27.281	2026-01-15 03:53:27.281
36	PHAT_DI_MUON	Phạt đi muộn	KHAU_TRU	LUONG_THANG_CO_DINH	f	\N		111	t	2026-01-15 03:53:27.281	2026-01-15 03:53:27.281
37	PHAT_VE_SOM	Phạt về sớm	KHAU_TRU	LUONG_THANG_CO_DINH	f	\N		112	t	2026-01-15 03:53:27.281	2026-01-15 03:53:27.281
38	PHAT_NGHI_KHONG_PHEP	Phạt nghỉ không phép	KHAU_TRU	LUONG_THANG_CO_DINH	f	\N		113	t	2026-01-15 03:53:27.281	2026-01-15 03:53:27.281
39	TRU_NGAY_CONG	Trừ ngày công	KHAU_TRU	LUONG_THANG_CO_DINH	f	\N		114	t	2026-01-15 03:53:27.281	2026-01-15 03:53:27.281
40	KHAU_TRU_KHAC	Khấu trừ khác	KHAU_TRU	LUONG_THANG_CO_DINH	f	\N		120	t	2026-01-15 03:53:27.281	2026-01-15 03:53:27.281
41	KHAU_TRU_UNG_LUONG	Khấu trừ ứng lương	KHAU_TRU	LUONG_THANG_CO_DINH	f	\N	Khoản khấu trừ từ ứng lương giữa tháng	900	t	2026-01-16 07:34:26.497	2026-01-16 07:34:26.497
42	TIEN_SAN_LUONG_CH	Tiền sản lượng Chia hàng	THU_NHAP	LUONG_THANG_CO_DINH	f	\N	Tiền thưởng theo sản lượng chia hàng = SP đạt * đơn giá	100	t	2026-01-20 07:57:17.863	2026-01-20 07:57:17.863
43	TIEN_SAN_LUONG_GH	Tiền sản lượng Giao hàng	THU_NHAP	LUONG_THANG_CO_DINH	f	\N	Tiền thưởng theo khối lượng giao hàng = KL * đơn giá	101	t	2026-01-20 07:57:27.832	2026-01-20 07:57:27.832
44	PHAT_SP_LOI	Phạt sản phẩm lỗi	KHAU_TRU	LUONG_THANG_CO_DINH	f	\N	Trừ tiền theo số SP lỗi = SP lỗi * đơn giá * hệ số	102	t	2026-01-20 07:57:38.213	2026-01-20 07:57:38.213
\.


--
-- Data for Name: ky_danh_gia_kpi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ky_danh_gia_kpi (id, ma_ky, ten_ky, loai_ky, thang, quy, nam, tu_ngay, den_ngay, han_nop_ket_qua, trang_thai, ghi_chu, ngay_tao, ngay_cap_nhat) FROM stdin;
3	KPI202506	Đánh giá KPI Tháng 6/2025	THANG	6	\N	2025	2025-06-01 00:00:00	2025-06-30 00:00:00	2025-07-06 00:00:00	DONG	Seed data	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
4	KPI202507	Đánh giá KPI Tháng 7/2025	THANG	7	\N	2025	2025-07-01 00:00:00	2025-07-31 00:00:00	2025-08-06 00:00:00	DONG	Seed data	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
5	KPI202508	Đánh giá KPI Tháng 8/2025	THANG	8	\N	2025	2025-08-01 00:00:00	2025-08-31 00:00:00	2025-09-06 00:00:00	DONG	Seed data	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
6	KPI202509	Đánh giá KPI Tháng 9/2025	THANG	9	\N	2025	2025-09-01 00:00:00	2025-09-30 00:00:00	2025-10-06 00:00:00	DONG	Seed data	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
7	KPI202510	Đánh giá KPI Tháng 10/2025	THANG	10	\N	2025	2025-10-01 00:00:00	2025-10-31 00:00:00	2025-11-06 00:00:00	DONG	Seed data	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
8	KPI202511	Đánh giá KPI Tháng 11/2025	THANG	11	\N	2025	2025-11-01 00:00:00	2025-11-30 00:00:00	2025-12-06 00:00:00	DONG	Seed data	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
9	KPI202512	Đánh giá KPI Tháng 12/2025	THANG	12	\N	2025	2025-12-01 00:00:00	2025-12-31 00:00:00	2026-01-06 00:00:00	MO	Seed data	2026-01-16 03:42:38.832	2026-01-16 03:42:38.832
\.


--
-- Data for Name: lich_phan_ca; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lich_phan_ca (id, thang_nam, phong_ban_id, nhom_id, ten_lich, ghi_chu, trang_thai, ngay_cong_bo, nguoi_cong_bo, tao_boi, cap_nhat_boi, ngay_tao, ngay_cap_nhat) FROM stdin;
1	2026-01	27	\N	Lịch phân ca tháng 01/2026 - Chia hàng	Lịch phân ca tự động tạo	NHAP	\N	\N	\N	\N	2026-01-23 05:56:37.517	2026-01-23 05:56:37.517
2	2026-01	25	\N	Lịch phân ca tháng 01/2026 - Đơn hàng	Lịch phân ca tự động tạo	NHAP	\N	\N	\N	\N	2026-01-23 05:56:37.517	2026-01-23 05:56:37.517
3	2026-01	33	\N	Lịch phân ca tháng 01/2026 - Thu mua	Lịch phân ca tự động tạo	NHAP	\N	\N	\N	\N	2026-01-23 05:56:37.517	2026-01-23 05:56:37.517
\.


--
-- Data for Name: lich_phan_ca_chi_tiet; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lich_phan_ca_chi_tiet (id, lich_phan_ca_id, nhan_vien_id, ngay, ca_lam_viec_id, ghi_chu, tao_boi, ngay_tao) FROM stdin;
\.


--
-- Data for Name: lich_su_chinh_sua; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lich_su_chinh_sua (id, bang_luong_id, nhan_vien_id, khoan_luong_id, gia_tri_cu, gia_tri_moi, loai_thay_doi, nguoi_thay_doi, ly_do, ngay_thay_doi) FROM stdin;
1	92	52	41	0	300000	DIEU_CHINH	admin	Khấu trừ ứng lương từ UL2026-01-27	2026-01-20 06:21:29.081
2	92	53	41	0	300000	DIEU_CHINH	admin	Khấu trừ ứng lương từ UL2026-01-27	2026-01-20 06:21:29.095
3	92	54	41	0	300000	DIEU_CHINH	admin	Khấu trừ ứng lương từ UL2026-01-27	2026-01-20 06:21:29.107
4	92	56	41	0	300000	DIEU_CHINH	admin	Khấu trừ ứng lương từ UL2026-01-27	2026-01-20 06:21:29.116
5	92	57	41	0	300000	DIEU_CHINH	admin	Khấu trừ ứng lương từ UL2026-01-27	2026-01-20 06:21:29.127
6	92	58	41	0	300000	DIEU_CHINH	admin	Khấu trừ ứng lương từ UL2026-01-27	2026-01-20 06:21:29.137
7	92	59	41	0	300000	DIEU_CHINH	admin	Khấu trừ ứng lương từ UL2026-01-27	2026-01-20 06:21:29.145
8	92	60	41	0	300000	DIEU_CHINH	admin	Khấu trừ ứng lương từ UL2026-01-27	2026-01-20 06:21:29.154
9	92	63	41	0	300000	DIEU_CHINH	admin	Khấu trừ ứng lương từ UL2026-01-27	2026-01-20 06:21:29.161
10	92	64	41	0	300000	DIEU_CHINH	admin	Khấu trừ ứng lương từ UL2026-01-27	2026-01-20 06:21:29.175
11	92	75	41	0	300000	DIEU_CHINH	admin	Khấu trừ ứng lương từ UL2026-01-27	2026-01-20 06:21:29.184
12	96	45	27	\N	400000	TAO_MOI	Hệ thống	\N	2026-01-20 06:27:05.832
13	96	44	27	\N	400000	TAO_MOI	Hệ thống	\N	2026-01-20 06:27:05.846
14	97	40	41	0	3000000	DIEU_CHINH	admin	Khấu trừ ứng lương từ UL-202601-10	2026-01-20 08:21:17.138
15	97	42	41	0	2000000	DIEU_CHINH	admin	Khấu trừ ứng lương từ UL-202601-10	2026-01-20 08:21:17.15
16	97	50	41	0	3000000	DIEU_CHINH	admin	Khấu trừ ứng lương từ UL-202601-10	2026-01-20 08:21:17.161
\.


--
-- Data for Name: lich_su_cong_thuc; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lich_su_cong_thuc (id, ma_cong_thuc, phien_ban, cong_thuc_cu, cong_thuc_moi, ly_do_thay_doi, nguoi_thay_doi, ngay_thay_doi) FROM stdin;
\.


--
-- Data for Name: lich_su_import; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lich_su_import (id, loai_import, ngay_du_lieu, ten_file, file_hash, so_dong, so_dong_hop_le, so_dong_loi, trang_thai, nguoi_import_id, import_luc, noi_dung_loi_json) FROM stdin;
\.


--
-- Data for Name: lich_su_sua_cong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lich_su_sua_cong (id, nhan_vien_id, ngay_cham_cong, truong_thay_doi, gia_tri_cu, gia_tri_moi, nguon_thay_doi, yeu_cau_sua_cong_id, nguoi_thuc_hien_id, ghi_chu, ngay_tao) FROM stdin;
\.


--
-- Data for Name: lich_su_thiet_bi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lich_su_thiet_bi (id, nhan_vien_id, hanh_dong, device_id_cu, device_id_moi, nguoi_thuc_hien_id, ly_do, ip_address, user_agent, ngay_tao) FROM stdin;
\.


--
-- Data for Name: mapping_excel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mapping_excel (id, ten_mapping, ten_cot_excel, khoan_luong_id, truong_he_thong, thu_tu_cot, trang_thai, ngay_tao, ngay_cap_nhat) FROM stdin;
\.


--
-- Data for Name: ngay_cong_bang_luong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ngay_cong_bang_luong (id, bang_luong_id, nhan_vien_id, ngay_cong_ly_thuyet, so_cong_thuc_te, so_ngay_nghi_phep, so_ngay_nghi_khong_phep, so_ngay_nghi_co_phep, so_ngay_nghi_co_luong, so_ngay_nghi_khong_luong, ngay_cong_dieu_chinh, ghi_chu, ngay_tao, ngay_cap_nhat) FROM stdin;
1	96	45	0.00	0.00	0.00	0.00	0.00	0.00	0.00	16.00	\N	2026-01-20 06:29:04.658	2026-01-20 06:29:04.658
2	96	44	0.00	0.00	0.00	0.00	0.00	0.00	0.00	15.00	\N	2026-01-20 06:29:13.085	2026-01-20 06:29:13.085
6	98	73	22.00	0.00	0.00	0.00	0.00	0.00	0.00	\N	\N	2026-01-20 07:14:58.13	2026-01-20 07:14:58.13
7	98	74	22.00	0.00	0.00	0.00	0.00	0.00	0.00	\N	\N	2026-01-20 07:14:58.135	2026-01-20 07:14:58.135
8	103	52	22.00	22.00	0.00	0.00	0.00	0.00	0.00	\N	\N	2026-01-21 02:54:42.65	2026-01-21 02:54:42.65
9	103	53	22.00	22.00	0.00	0.00	0.00	0.00	0.00	\N	\N	2026-01-21 02:54:42.65	2026-01-21 02:54:42.65
10	103	54	22.00	22.00	0.00	0.00	0.00	0.00	0.00	\N	\N	2026-01-21 02:54:42.65	2026-01-21 02:54:42.65
11	103	56	22.00	22.00	0.00	0.00	0.00	0.00	0.00	\N	\N	2026-01-21 02:54:42.65	2026-01-21 02:54:42.65
12	103	57	22.00	22.00	0.00	0.00	0.00	0.00	0.00	\N	\N	2026-01-21 02:54:42.65	2026-01-21 02:54:42.65
13	103	58	22.00	22.00	0.00	0.00	0.00	0.00	0.00	\N	\N	2026-01-21 02:54:42.65	2026-01-21 02:54:42.65
14	103	59	22.00	22.00	0.00	0.00	0.00	0.00	0.00	\N	\N	2026-01-21 02:54:42.65	2026-01-21 02:54:42.65
15	103	60	22.00	22.00	0.00	0.00	0.00	0.00	0.00	\N	\N	2026-01-21 02:54:42.65	2026-01-21 02:54:42.65
16	103	63	22.00	22.00	0.00	0.00	0.00	0.00	0.00	\N	\N	2026-01-21 02:54:42.65	2026-01-21 02:54:42.65
17	103	64	22.00	22.00	0.00	0.00	0.00	0.00	0.00	\N	\N	2026-01-21 02:54:42.65	2026-01-21 02:54:42.65
18	103	75	22.00	22.00	0.00	0.00	0.00	0.00	0.00	\N	\N	2026-01-21 02:54:42.65	2026-01-21 02:54:42.65
19	95	55	22.00	14.00	0.00	0.00	0.00	0.00	0.00	\N	\N	2026-01-21 06:20:57.402	2026-01-21 06:20:57.402
20	95	70	22.00	14.00	0.00	0.00	0.00	0.00	0.00	\N	\N	2026-01-21 06:20:57.402	2026-01-21 06:20:57.402
\.


--
-- Data for Name: nguoi_dung; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nguoi_dung (id, ten_dang_nhap, mat_khau, email, ho_ten, nhan_vien_id, trang_thai, lan_dang_nhap_cuoi, ngay_tao, ngay_cap_nhat) FROM stdin;
1	admin	$2b$10$ck.VXU1EYVLnFJ5QrBfLluvyQo4sGm9KX6sxxMqL/7OeumuozwdMy	admin@company.com	Administrator	\N	HOAT_DONG	2026-01-24 00:41:16.584	2026-01-15 03:46:16.014	2026-01-24 00:41:16.585
19	NV0001	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0001@company.com	ĐỖ MỘNG CHÚC ANH	40	HOAT_DONG	2026-01-24 00:41:49.605	2026-01-24 00:39:12.433	2026-01-24 00:41:49.606
22	NV0005	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0005@company.com	NGUYỄN ÁI MINH TRIỆU	44	HOAT_DONG	2026-01-24 00:42:24.514	2026-01-24 00:39:12.433	2026-01-24 00:42:24.514
5	NV0008	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0008@company.com	LÂM HUỲNH THẠCH QUÝ	47	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
6	NV0009	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0009@company.com	NGUYỄN ÁI KHANH	48	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
7	NV0010	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0010@company.com	NGUYỄN VŨ HOÀNG	49	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
8	NV0016	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0016@company.com	VÕ THỊ BÍCH DUNG	55	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
9	NV0013	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0013@company.com	TRẦN THỊ TUYẾT LÊ	52	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
10	NV0014	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0014@company.com	DƯ THỊ ƯƠNG	53	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
11	NV0015	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0015@company.com	SƠN THỊ NGỌC HUYỀN	54	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
12	NV0017	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0017@company.com	TRẦN THỊ THANH HƯƠNG	56	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
13	NV0018	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0018@company.com	TRẦN THỊ NGỌC THANH	57	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
14	NV0019	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0019@company.com	BÙI THỊ ÁI VÂN	58	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
15	NV0020	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0020@company.com	NGUYỄN THỊ THU	59	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
16	NV0021	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0021@company.com	PHẠM THỊ MINH	60	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
17	NV0024	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0024@company.com	LÊ THỊ THÙY TRANG	63	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
18	NV0025	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0025@company.com	NGUYỄN LÝ HỒNG NGỌC	64	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
20	NV0003	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0003@company.com	LÂM NHƯ NGỌC	42	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
21	NV0011	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0011@company.com	TRẦN THỊ DIỆU LINH	50	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
23	NV0006	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0006@company.com	NGUYỄN THỊ THANH THÚY	45	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
24	NV0002	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	hoang@mail.com	LÊ THÀNH HOÀNG	41	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
25	NV0004	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	duy@mail.com	PHẠM THÚY DUY	43	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
26	NV0012	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nhan@mail.com	TRẦN HỒ HỮU NHÂN	51	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
27	NV0022	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	be@mail.com	CHÂU THỊ BÉ	61	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
28	NV0023	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	van@mail.com	NGUYỄN NGỌC KIM VĂN	62	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
29	NV0035	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0035@company.com	TRẦN THỊ ÁI NHI	73	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
30	NV0036	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0036@company.com	TRƯƠNG MỸ DUYÊN	74	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
31	NV0007	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0007@company.com	PHẠM MINH MẪN	46	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
32	NV0032	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0032@company.com	NGUYỄN THÀNH BẢO	70	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
33	NV0037	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0037@company.com	LÊ PHẠM HÀ	75	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
34	NV0026	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0026@company.com	NGUYỄN NHẬT TUẤN	65	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
35	NV0027	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0027@company.com	PHẠM NGỌC AN	66	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
36	NV0028	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0028@company.com	HOÀNG HÙNG	67	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
37	NV0029	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0029@company.com	TRẦN ĐỨC TÚ	68	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
38	NV0033	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0033@company.com	LÝ VĂN HÒA	71	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
39	NV0034	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0034@company.com	HUỲNH PHƯỚC HẢI	72	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
40	NV0030	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0030@company.com	TRẦN QUỐC VŨ	69	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
41	NV0038	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0038@company.com	PHẠM VĂN HÙNG	76	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
42	NV0039	$2b$10$/sSBr8eqyX/f1FgXwkbX6.r0WhE3fNapTd6r6rXikSgZ4OJsIIxN6	nv0039@company.com	HOÀNG TỬ LẬP	77	HOAT_DONG	\N	2026-01-24 00:39:12.433	2026-01-24 00:39:12.433
\.


--
-- Data for Name: nguoi_dung_vai_tro; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nguoi_dung_vai_tro (id, nguoi_dung_id, vai_tro_id, phong_ban_id, tu_ngay, den_ngay, ngay_tao) FROM stdin;
1	1	1	\N	2026-01-15 03:46:19.92	\N	2026-01-15 03:46:19.92
4	1	1	\N	2026-01-15 03:53:27.281	\N	2026-01-15 03:53:27.281
5	5	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
6	6	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
7	7	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
8	8	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
9	9	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
10	10	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
11	11	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
12	12	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
13	13	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
14	14	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
15	15	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
16	16	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
17	17	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
18	18	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
19	19	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
20	20	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
21	21	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
22	22	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
23	23	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
24	24	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
25	25	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
26	26	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
27	27	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
28	28	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
29	29	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
30	30	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
31	31	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
32	32	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
33	33	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
34	34	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
35	35	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
36	36	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
37	37	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
38	38	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
39	39	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
40	40	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
41	41	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
42	42	5	\N	2026-01-24 00:39:18.479	\N	2026-01-24 00:39:18.479
\.


--
-- Data for Name: nguoi_phu_thuoc; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nguoi_phu_thuoc (id, nhan_vien_id, ho_ten, ngay_sinh, quan_he, ma_so_thue, so_cccd, tu_ngay, den_ngay, trang_thai, ghi_chu, ngay_tao, ngay_cap_nhat) FROM stdin;
\.


--
-- Data for Name: nhan_vien; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nhan_vien (id, ma_nhan_vien, ho_ten, email, so_dien_thoai, phong_ban_id, chuc_vu, loai_nhan_vien, dong_bhxh, luong_co_ban, ngay_vao_lam, ngay_nghi_viec, gioi_tinh, ngay_sinh, dia_chi, so_cccd, hinh_cccd_truoc, hinh_cccd_sau, so_dien_thoai_khan_cap, nguoi_lien_he_khan_cap, quan_he_khan_cap, trang_thai, tao_boi, cap_nhat_boi, ngay_tao, ngay_cap_nhat) FROM stdin;
47	NV0008	LÂM HUỲNH THẠCH QUÝ	\N	\N	25	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.022
48	NV0009	NGUYỄN ÁI KHANH	\N	\N	25	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.032
49	NV0010	NGUYỄN VŨ HOÀNG	\N	\N	25	Trưởng nhóm	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.041
55	NV0016	VÕ THỊ BÍCH DUNG	\N	\N	26	Quản Lý	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.051
52	NV0013	TRẦN THỊ TUYẾT LÊ	\N	\N	27	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.069
53	NV0014	DƯ THỊ ƯƠNG	\N	\N	27	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.078
54	NV0015	SƠN THỊ NGỌC HUYỀN	\N	\N	27	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.087
56	NV0017	TRẦN THỊ THANH HƯƠNG	\N	\N	27	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.096
57	NV0018	TRẦN THỊ NGỌC THANH	\N	\N	27	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.105
58	NV0019	BÙI THỊ ÁI VÂN	\N	\N	27	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.114
59	NV0020	NGUYỄN THỊ THU	\N	\N	27	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.124
60	NV0021	PHẠM THỊ MINH	\N	\N	27	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.133
63	NV0024	LÊ THỊ THÙY TRANG	\N	\N	27	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.142
64	NV0025	NGUYỄN LÝ HỒNG NGỌC	\N	\N	27	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	NGHI_VIEC	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.151
40	NV0001	ĐỖ MỘNG CHÚC ANH	\N	\N	30	Thủ quỹ	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.171
42	NV0003	LÂM NHƯ NGỌC	\N	\N	30	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.181
50	NV0011	TRẦN THỊ DIỆU LINH	\N	\N	30	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.189
44	NV0005	NGUYỄN ÁI MINH TRIỆU	\N	\N	31	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.206
45	NV0006	NGUYỄN THỊ THANH THÚY	\N	\N	31	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.225
41	NV0002	LÊ THÀNH HOÀNG	hoang@mail.com	\N	30		CHINH_THUC	t	5000000	2026-01-13 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	NGHI_VIEC	\N	\N	2026-01-15 03:53:27.281	2026-01-15 03:53:27.281
43	NV0004	PHẠM THÚY DUY	duy@mail.com	\N	30		CHINH_THUC	t	5000000	2026-01-13 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	NGHI_VIEC	\N	\N	2026-01-15 03:53:27.281	2026-01-15 03:53:27.281
51	NV0012	TRẦN HỒ HỮU NHÂN	nhan@mail.com	\N	26		CHINH_THUC	t	5000000	2026-01-13 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	NGHI_VIEC	\N	\N	2026-01-15 03:53:27.281	2026-01-15 03:53:27.281
61	NV0022	CHÂU THỊ BÉ	be@mail.com	\N	27		CHINH_THUC	t	5000000	2026-01-13 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	NGHI_VIEC	\N	\N	2026-01-15 03:53:27.281	2026-01-15 03:53:27.281
62	NV0023	NGUYỄN NGỌC KIM VĂN	van@mail.com	\N	27		CHINH_THUC	t	5000000	2026-01-13 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	NGHI_VIEC	\N	\N	2026-01-15 03:53:27.281	2026-01-15 03:53:27.281
73	NV0035	TRẦN THỊ ÁI NHI	\N	\N	24	Học việc	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:04.982
74	NV0036	TRƯƠNG MỸ DUYÊN	\N	\N	24	Học việc	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05
46	NV0007	PHẠM MINH MẪN	\N	\N	25	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.012
70	NV0032	NGUYỄN THÀNH BẢO	\N	\N	26	Nhân Viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.06
75	NV0037	LÊ PHẠM HÀ	\N	\N	27	Sơ chế	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.162
65	NV0026	NGUYỄN NHẬT TUẤN	\N	\N	32	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.234
66	NV0027	PHẠM NGỌC AN	\N	\N	32	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.242
67	NV0028	HOÀNG HÙNG	\N	\N	32	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.253
68	NV0029	TRẦN ĐỨC TÚ	\N	\N	32	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.261
71	NV0033	LÝ VĂN HÒA	\N	\N	32	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.27
72	NV0034	HUỲNH PHƯỚC HẢI	\N	\N	32	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.279
69	NV0030	TRẦN QUỐC VŨ	\N	\N	33	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.29
76	NV0038	PHẠM VĂN HÙNG	\N	\N	33	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.301
77	NV0039	HOÀNG TỬ LẬP	\N	\N	33	Nhân viên	CHINH_THUC	t	5310000	2025-01-01 00:00:00	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	DANG_LAM	\N	\N	2026-01-15 03:53:27.281	2026-01-23 02:45:05.311
\.


--
-- Data for Name: nhan_vien_hop_dong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nhan_vien_hop_dong (id, nhan_vien_id, loai_hop_dong, tu_ngay, den_ngay, luong_co_ban, luong_dong_bh, he_so_luong, loai_nhan_vien, trang_thai, ghi_chu, file_hop_dong, files_hop_dong, tao_boi, ngay_tao) FROM stdin;
29	73	1_NAM	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
30	74	1_NAM	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
6	46	3_NAM	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
7	47	VO_THOI_HAN	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
8	48	3_NAM	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
9	49	VO_THOI_HAN	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
14	55	1_NAM	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
26	70	3_NAM	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
11	52	3_NAM	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
12	53	VO_THOI_HAN	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
13	54	1_NAM	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
15	56	1_NAM	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
16	57	VO_THOI_HAN	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
1	58	THU_VIEC	2026-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC		\N	\N	\N	2026-01-16 00:33:06.408
17	59	1_NAM	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
18	60	VO_THOI_HAN	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
19	63	3_NAM	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
20	64	VO_THOI_HAN	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
31	75	3_NAM	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
2	40	3_NAM	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
3	42	3_NAM	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
10	50	VO_THOI_HAN	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
4	44	1_NAM	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
5	45	1_NAM	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
21	65	3_NAM	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
22	66	1_NAM	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
23	67	VO_THOI_HAN	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
24	68	1_NAM	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
27	71	VO_THOI_HAN	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
28	72	VO_THOI_HAN	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
25	69	3_NAM	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
32	76	3_NAM	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
33	77	1_NAM	2024-01-01	\N	5310000	5310000	1.00	CHINH_THUC	HIEU_LUC	Seed data 2025	\N	\N	\N	2026-01-16 03:34:00.519
\.


--
-- Data for Name: nhan_vien_ngan_hang; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nhan_vien_ngan_hang (id, nhan_vien_id, ten_ngan_hang, so_tai_khoan, chu_tai_khoan, chi_nhanh, la_mac_dinh, tu_ngay, den_ngay, ghi_chu, ngay_tao) FROM stdin;
29	73	BIDV	00005849574924	TRẦN THỊ ÁI NHI	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
30	74	VPBank	00007460904503	TRƯƠNG MỸ DUYÊN	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
5	46	VPBank	00001030223345	PHẠM MINH MẪN	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
6	47	VPBank	00006627279023	LÂM HUỲNH THẠCH QUÝ	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
7	48	BIDV	00002652342736	NGUYỄN ÁI KHANH	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
8	49	Techcombank	00001223267848	NGUYỄN VŨ HOÀNG	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
13	55	BIDV	00009878276004	VÕ THỊ BÍCH DUNG	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
26	70	TPBank	00007779422904	NGUYỄN THÀNH BẢO	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
10	52	TPBank	00006484024319	TRẦN THỊ TUYẾT LÊ	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
17	59	ACB	00006817024440	NGUYỄN THỊ THU	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
18	60	Sacombank	00004412345932	PHẠM THỊ MINH	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
19	63	Sacombank	00008913669452	LÊ THỊ THÙY TRANG	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
20	64	ACB	00005429827600	NGUYỄN LÝ HỒNG NGỌC	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
31	75	BIDV	00005053394962	LÊ PHẠM HÀ	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
1	40	ACB	00007173893830	ĐỖ MỘNG CHÚC ANH	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
2	42	Techcombank	00008627768904	LÂM NHƯ NGỌC	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
9	50	MB Bank	00007547314492	TRẦN THỊ DIỆU LINH	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
3	44	Vietcombank	00003281520405	NGUYỄN ÁI MINH TRIỆU	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
4	45	Vietcombank	00007712078746	NGUYỄN THỊ THANH THÚY	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
21	65	Sacombank	00002690259925	NGUYỄN NHẬT TUẤN	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
22	66	Vietcombank	00008404520765	PHẠM NGỌC AN	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
23	67	Vietcombank	00007821996944	HOÀNG HÙNG	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
24	68	TPBank	00004087909897	TRẦN ĐỨC TÚ	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
27	71	BIDV	00008395899941	LÝ VĂN HÒA	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
28	72	Sacombank	00001664052850	HUỲNH PHƯỚC HẢI	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
25	69	Techcombank	00008471564469	TRẦN QUỐC VŨ	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
32	76	Sacombank	00007136386908	PHẠM VĂN HÙNG	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
33	77	Vietcombank	00009168217083	HOÀNG TỬ LẬP	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
11	53	Sacombank	00004797348374	DƯ THỊ ƯƠNG	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
12	54	ACB	00001833396234	SƠN THỊ NGỌC HUYỀN	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
14	56	MB Bank	00009478345462	TRẦN THỊ THANH HƯƠNG	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
15	57	VPBank	00010218440216	TRẦN THỊ NGỌC THANH	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
16	58	Techcombank	00008337645665	BÙI THỊ ÁI VÂN	Chi nhánh TP.HCM	t	2025-01-01	\N	\N	2026-01-16 04:05:01.353
\.


--
-- Data for Name: nhan_vien_phong_ban; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nhan_vien_phong_ban (id, nhan_vien_id, phong_ban_id, don_vi_con_id, tu_ngay, den_ngay, ghi_chu, tao_boi, ngay_tao) FROM stdin;
\.


--
-- Data for Name: nhan_vien_thue_bh; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nhan_vien_thue_bh (id, nhan_vien_id, mst_ca_nhan, so_cmnd_cccd, ngay_cap, noi_cap, so_nguoi_phu_thuoc, ghi_chu, ngay_tao, ngay_cap_nhat) FROM stdin;
\.


--
-- Data for Name: nhan_vien_thuoc_nhom; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nhan_vien_thuoc_nhom (id, nhan_vien_id, nhom_id, tu_ngay, den_ngay, ngay_tao) FROM stdin;
1	52	1	2025-01-01	\N	2026-01-16 04:05:01.34
2	53	1	2025-01-01	\N	2026-01-16 04:05:01.34
3	54	1	2025-01-01	\N	2026-01-16 04:05:01.34
4	56	1	2025-01-01	\N	2026-01-16 04:05:01.34
5	57	1	2025-01-01	\N	2026-01-16 04:05:01.34
6	58	1	2025-01-01	\N	2026-01-16 04:05:01.34
7	59	1	2025-01-01	\N	2026-01-16 04:05:01.34
8	60	1	2025-01-01	\N	2026-01-16 04:05:01.34
9	63	1	2025-01-01	\N	2026-01-16 04:05:01.34
10	64	1	2025-01-01	\N	2026-01-16 04:05:01.34
11	75	1	2025-01-01	\N	2026-01-16 04:05:01.34
12	65	2	2025-01-01	\N	2026-01-16 04:05:01.349
13	66	2	2025-01-01	\N	2026-01-16 04:05:01.349
14	67	2	2025-01-01	\N	2026-01-16 04:05:01.349
15	68	2	2025-01-01	\N	2026-01-16 04:05:01.349
16	71	2	2025-01-01	\N	2026-01-16 04:05:01.349
17	72	2	2025-01-01	\N	2026-01-16 04:05:01.349
18	40	3	2025-01-01	\N	2026-01-16 04:05:01.351
19	42	3	2025-01-01	\N	2026-01-16 04:05:01.351
20	44	3	2025-01-01	\N	2026-01-16 04:05:01.351
21	45	3	2025-01-01	\N	2026-01-16 04:05:01.351
22	46	3	2025-01-01	\N	2026-01-16 04:05:01.351
23	47	3	2025-01-01	\N	2026-01-16 04:05:01.351
24	48	3	2025-01-01	\N	2026-01-16 04:05:01.351
25	49	3	2025-01-01	\N	2026-01-16 04:05:01.351
26	50	3	2025-01-01	\N	2026-01-16 04:05:01.351
27	73	3	2025-01-01	\N	2026-01-16 04:05:01.351
28	74	3	2025-01-01	\N	2026-01-16 04:05:01.351
\.


--
-- Data for Name: nhan_vien_trach_nhiem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nhan_vien_trach_nhiem (id, nhan_vien_id, phong_ban_id, cap_trach_nhiem, he_so_trach_nhiem, vai_tro, tu_ngay, den_ngay, ghi_chu, ngay_tao, ngay_cap_nhat) FROM stdin;
\.


--
-- Data for Name: nhom_nhan_vien; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.nhom_nhan_vien (id, ma_nhom, ten_nhom, mo_ta, mau_sac, trang_thai, ngay_tao) FROM stdin;
1	CHIA_HANG	Nhóm Chia hàng	Nhân viên phòng chia hàng	#3B82F6	t	2026-01-16 04:05:01.333
2	GIAO_HANG	Nhóm Giao hàng	Nhân viên giao hàng (shipper)	#10B981	t	2026-01-16 04:05:01.338
3	VAN_PHONG	Nhóm Văn phòng	Nhân viên khối văn phòng	#8B5CF6	t	2026-01-16 04:05:01.339
4	QUAN_LY	Nhóm Quản lý	Trưởng phòng, quản lý	#EF4444	t	2026-01-16 04:05:01.339
\.


--
-- Data for Name: phan_quyen_phong_ban; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.phan_quyen_phong_ban (id, nguoi_dung_id, phong_ban_id, quyen, tao_boi, ngay_tao) FROM stdin;
\.


--
-- Data for Name: phien_dang_nhap; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.phien_dang_nhap (id, nguoi_dung_id, token, dia_chi_ip, user_agent, thoi_gian_bat_dau, thoi_gian_het_han, trang_thai) FROM stdin;
1	1	6062b639f4602175133af51d552be596134cad064cac344c9cbde9c108245fa9	::ffff:192.168.65.1	curl/8.7.1	2026-01-15 03:46:24.82	2026-01-15 11:46:24.819	HOAT_DONG
2	1	671418d3283401cd8d3fdc619d8ed5cd71c42a0c5782a534734f8bf84ae0665f	::ffff:172.18.0.3	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	2026-01-15 03:47:53.14	2026-01-15 11:47:53.139	HOAT_DONG
3	1	132e10b636a067037f788759f15cc579d71670be850e84a88703f2de793b7119	::ffff:172.18.0.2	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	2026-01-16 00:27:12.952	2026-01-16 08:27:12.951	HOAT_DONG
4	1	4e946ed38f0c14ae4fd2852f7d50c20208060a38be5d231f3dec0e744e411a1a	::ffff:172.18.0.1	curl/8.7.1	2026-01-16 02:06:01.486	2026-01-16 10:06:01.486	HOAT_DONG
5	1	2bd23f0bb7a156c89eea88fe2d8637cb317c43d0ade59ba4f74220459984be16	::ffff:192.168.65.1	curl/8.7.1	2026-01-16 02:39:00.951	2026-01-16 10:39:00.95	HOAT_DONG
6	1	4835cf22410ad9b48efee3618ff91ecf10ab55396c7a86627ee55d1d419534bd	::ffff:172.66.156.100	curl/8.7.1	2026-01-16 06:25:30.765	2026-01-16 14:25:30.764	HOAT_DONG
7	1	8db50f7d5811db5cc9ccc05242b938fb407b690ea3ad41a1c007c2fd14edb2bc	::ffff:172.66.156.100	curl/8.7.1	2026-01-16 06:50:59.546	2026-01-16 14:50:59.545	HOAT_DONG
8	1	b1e1a711f5f25996f082bf2a34be2ed3d6703432ab42895b0c9430322ef14d88	::ffff:172.18.0.3	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	2026-01-17 05:23:56.93	2026-01-17 13:23:56.928	HOAT_DONG
9	1	e32ca012304954b5989a0eee688bc76dec4e091d7a11780a2b42c4c90fb7ef66	::ffff:172.18.0.4	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	2026-01-20 06:13:58.13	2026-01-20 14:13:58.129	HOAT_DONG
10	1	b35eebabbf8ed61b55a7451d95e7bbbc61a3f32c1ee6f752ca5a24adf8d467f3	::ffff:172.66.156.100	curl/8.7.1	2026-01-20 06:37:04.394	2026-01-20 14:37:04.393	HOAT_DONG
11	1	7206fb384a83c348b1867b9f68a20eaf2c37f45db5e2f2c86a92d9db2df89611	::ffff:172.66.156.100	curl/8.7.1	2026-01-20 06:37:48.21	2026-01-20 14:37:48.21	HOAT_DONG
12	1	858333d5dad909423694730bf842bf31e48dbe722c790de7d4256b3cce9c2fdc	::ffff:172.66.156.100	curl/8.7.1	2026-01-20 06:37:55.502	2026-01-20 14:37:55.501	HOAT_DONG
13	1	f85a71d1c4967d985607f83e1b012754b4689cb0b9dba819f19654659c49e4d7	::ffff:172.66.156.100	curl/8.7.1	2026-01-20 06:40:03.811	2026-01-20 14:40:03.81	HOAT_DONG
14	1	7c4dd233f1709e0faa694fb45aad14f6df191256572eff5c0077ed4a76e6c182	::ffff:172.66.156.100	curl/8.7.1	2026-01-20 06:40:16.717	2026-01-20 14:40:16.716	HOAT_DONG
15	1	361167e8754c4413b944abeefdb0b35b8da140e2a34bdb45e14a19bd9e636a24	::ffff:172.66.156.100	curl/8.7.1	2026-01-20 06:41:09.914	2026-01-20 14:41:09.913	HOAT_DONG
16	1	292e790fe719b3250ade5fa4ccaa5653ec0a722d56d39251d1fe8eef42f4d83f	::ffff:172.66.156.100	node	2026-01-20 07:05:42.647	2026-01-20 15:05:42.645	HOAT_DONG
17	1	1a42f021d7c4ee8ccc21de4d45b353991f3a80c98185ae535050f2e99b1ef71d	::ffff:172.66.156.100	node	2026-01-20 07:07:28.498	2026-01-20 15:07:28.497	HOAT_DONG
18	1	0a27a268dffa6cb8eaf9fc2f49fea79f477d745be179fe262acf5a9871f318ba	::ffff:172.66.156.100	node	2026-01-20 07:08:59.712	2026-01-20 15:08:59.711	HOAT_DONG
19	1	7191f673fb0b3ae14773d9c3254069ee79097f4a10d69d3f42417774f4781a32	::ffff:172.66.156.100	curl/8.7.1	2026-01-20 07:10:43.442	2026-01-20 15:10:43.441	HOAT_DONG
20	1	535d4c2557a3bc36cb07307e6bd37fc89adfdd5ded882ff8d7862ea496be1d5b	::ffff:172.66.156.100	node	2026-01-20 07:11:42.904	2026-01-20 15:11:42.902	HOAT_DONG
21	1	dbc6776afc8253441f9eb9754a34ef80eabf35921e93f62f64e8eeb71e1cbc6d	::ffff:172.66.156.100	node	2026-01-20 07:12:09.833	2026-01-20 15:12:09.832	HOAT_DONG
22	1	ab65dfe97f8ce2170a2603c4b2050df0c8ed49a49a058fc12cb1c04419c32a94	::ffff:172.66.156.100	node	2026-01-20 07:14:57.936	2026-01-20 15:14:57.935	HOAT_DONG
23	1	5b05dadbc8b220e65093b0a745e2f2129f0c8cd731f073ee5b050e564dabbe29	::ffff:172.66.156.100	curl/8.7.1	2026-01-20 07:52:22.67	2026-01-20 15:52:22.669	HOAT_DONG
24	1	f0a59fe80db1e0017fc56029312c1bc17ec6be564eab9023162818c513f89d3f	::ffff:172.66.156.100	curl/8.7.1	2026-01-20 07:52:30.092	2026-01-20 15:52:30.091	HOAT_DONG
25	1	1d6a91a42b8a2a097fe621e4e63e01e9877affba37a5222a4ee4e670bdb12770	::ffff:172.66.156.100	curl/8.7.1	2026-01-20 07:52:43.107	2026-01-20 15:52:43.106	HOAT_DONG
26	1	b027dd8bc2067fa105fd0736726a7d24a1e7d33a34f09e609154c5b7e5b69ee2	::ffff:172.66.156.100	curl/8.7.1	2026-01-20 07:53:09.429	2026-01-20 15:53:09.428	HOAT_DONG
27	1	d9a913ddc11b9d2982114797b0262130722dbd8178d9d4cc952373abd6bc308e	::ffff:172.66.156.100	curl/8.7.1	2026-01-20 07:53:18.681	2026-01-20 15:53:18.68	HOAT_DONG
28	1	8da206b15cdcad5776c08de2263ee3094b6b651220e409f5c99d97b5cd602a7e	::ffff:172.66.156.100	curl/8.7.1	2026-01-20 07:58:31.711	2026-01-20 15:58:31.71	HOAT_DONG
29	1	df739e4c250668163959f71ca4e6c9f42500f9609bf731bf869cdbb25d783ff4	::ffff:172.66.156.100	curl/8.7.1	2026-01-20 07:58:48.833	2026-01-20 15:58:48.832	HOAT_DONG
30	1	f66455023b364d430f95f913d2d36428b83dbf5f14740aa7cef8a41c87d2d4fb	::ffff:172.66.156.100	curl/8.7.1	2026-01-20 07:58:56.914	2026-01-20 15:58:56.913	HOAT_DONG
31	1	ae5fa0fc3537135acc89b51491ba0faa83609f3222fb0fbf8e7f073f25566ce2	::ffff:172.18.0.2	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	2026-01-21 00:35:30.906	2026-01-21 08:35:30.905	HOAT_DONG
32	1	9bec9abf35475ce6f5648cfaabb2514dd67b45e54143db0264fd5ec97c17187e	::ffff:172.18.0.2	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	2026-01-23 00:50:00.802	2026-01-23 08:50:00.801	HOAT_DONG
33	1	e2ce6435babec366e5d0be54267e87f4040e460cd65ee67ff480a977937a0682	::ffff:172.18.0.4	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	2026-01-23 02:33:13.629	2026-01-23 10:33:13.627	HOAT_DONG
34	1	5f797b9a49f2e89b93420c48d6b8727ab35dca17ace2974df88d7f3b26130443	::ffff:172.19.0.4	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	2026-01-23 05:57:06.355	2026-01-23 13:57:06.354	HOAT_DONG
35	1	dbe924d03c07ce18db37981c052442fd341972b7196abc4884851cffd3ac384e	::ffff:172.19.0.4	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	2026-01-23 06:03:54.638	2026-01-23 14:03:54.638	HOAT_DONG
36	1	954200528707b47a743b0daf98ccdc7ea96d475813d759e439d55144df1439ab	::ffff:172.19.0.4	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36	2026-01-23 06:06:34.524	2026-01-23 14:06:34.524	HOAT_DONG
37	1	a12a98b8a7f7db678307315aba18512aa656b4a803f8a8141480d1d9f5807b2b	::ffff:172.19.0.4	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	2026-01-23 07:45:20.511	2026-01-23 15:45:20.51	HOAT_DONG
38	1	6d9372a148cc1951f198c352f4e14bcfd946d6b7356116d12224a265704ade9e	::ffff:172.19.0.1	curl/7.68.0	2026-01-24 00:34:02.7	2026-01-24 08:34:02.698	HOAT_DONG
39	1	ee32f4f71d3c2b7a9e707e74c61d24f8cc9dbefea645c7091c9f04b5223569f6	::ffff:172.19.0.1	curl/7.68.0	2026-01-24 00:36:09.733	2026-01-24 08:36:09.731	HOAT_DONG
40	19	82025fae52412906bac505c70facc1c4d55be2adef75edc5af093ba03aab3146	::ffff:172.19.0.1	curl/7.68.0	2026-01-24 00:39:28.77	2026-01-24 08:39:28.769	HOAT_DONG
41	1	76a59b45a80952730eb832f15d7b47d1583844e2bdcc4c405f80cac17af8d507	::ffff:172.19.0.4	curl/8.7.1	2026-01-24 00:40:37.021	2026-01-24 08:40:37.02	HOAT_DONG
42	1	63deea98907c7eb7a44603a76177cb2deb32cf3cc3d0f59f4dce969c4fd882c9	::ffff:172.19.0.4	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	2026-01-24 00:41:16.582	2026-01-24 08:41:16.581	HOAT_DONG
43	19	232542d592cb92f4aac9d96dfcde056a99c8468114fcb9e14036712e9a0ae78a	::ffff:172.19.0.4	Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Mobile/15E148 Safari/604.1	2026-01-24 00:41:49.604	2026-01-24 08:41:49.602	HOAT_DONG
44	22	f8016fd820dfae3215958c7a90149bc53bc7e10a607f8a7e7d0f7dff21aaea32	::ffff:172.19.0.4	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36	2026-01-24 00:42:24.512	2026-01-24 08:42:24.511	HOAT_DONG
\.


--
-- Data for Name: phieu_dieu_chinh; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.phieu_dieu_chinh (id, ma_phieu, bang_luong_id, nhan_vien_id, loai_dieu_chinh, ly_do, ghi_chu, trang_thai, nguoi_tao, ngay_tao, nguoi_duyet, ngay_duyet, nguoi_tu_choi, ngay_tu_choi, ly_do_tu_choi) FROM stdin;
2	PDC202506001	10	66	TANG	Thưởng đột xuất	Seed data	DA_DUYET	admin	2026-01-16 03:43:05.369	\N	\N	\N	\N	\N
3	PDC202506002	14	70	GIAM	Khấu trừ ứng lương	Seed data	DA_DUYET	admin	2026-01-16 03:43:05.369	\N	\N	\N	\N	\N
4	PDC202506003	10	67	GIAM	Khấu trừ ứng lương	Seed data	DA_DUYET	admin	2026-01-16 03:43:05.369	\N	\N	\N	\N	\N
5	PDC202507001	23	46	TANG	Thưởng hoàn thành KPI	Seed data	DA_DUYET	admin	2026-01-16 03:43:05.369	\N	\N	\N	\N	\N
6	PDC202507003	21	57	TANG	Thưởng đột xuất	Seed data	DA_DUYET	admin	2026-01-16 03:43:05.369	\N	\N	\N	\N	\N
7	PDC202508003	36	76	TANG	Thưởng hoàn thành KPI	Seed data	DA_DUYET	admin	2026-01-16 03:43:05.369	\N	\N	\N	\N	\N
8	PDC202509001	50	70	TANG	Thưởng đột xuất	Seed data	DA_DUYET	admin	2026-01-16 03:43:05.369	\N	\N	\N	\N	\N
9	PDC202509003	52	73	TANG	Thưởng hoàn thành KPI	Seed data	DA_DUYET	admin	2026-01-16 03:43:05.369	\N	\N	\N	\N	\N
10	PDC202510001	57	56	TANG	Thưởng hoàn thành KPI	Seed data	DA_DUYET	admin	2026-01-16 03:43:05.369	\N	\N	\N	\N	\N
11	PDC202510003	66	44	TANG	Thưởng nóng	Seed data	DA_DUYET	admin	2026-01-16 03:43:05.369	\N	\N	\N	\N	\N
12	PDC202511001	78	45	TANG	Thưởng hoàn thành KPI	Seed data	CHO_DUYET	admin	2026-01-16 03:43:05.369	\N	\N	\N	\N	\N
13	PDC202511002	71	47	TANG	Thưởng đột xuất	Seed data	CHO_DUYET	admin	2026-01-16 03:43:05.369	\N	\N	\N	\N	\N
14	PDC202511003	71	48	TANG	Thưởng nóng	Seed data	CHO_DUYET	admin	2026-01-16 03:43:05.369	\N	\N	\N	\N	\N
15	PDC202512001	86	70	TANG	Thưởng hoàn thành KPI	Seed data	CHO_DUYET	admin	2026-01-16 03:43:05.369	\N	\N	\N	\N	\N
16	PDC202512002	83	48	TANG	Thưởng đột xuất	Seed data	CHO_DUYET	admin	2026-01-16 03:43:05.369	\N	\N	\N	\N	\N
17	PDC202512003	87	40	TANG	Thưởng đột xuất	Seed data	CHO_DUYET	admin	2026-01-16 03:43:05.369	\N	\N	\N	\N	\N
18	PDC202508001	34	71	GIAM	Phạt vi phạm quy chế	Seed data	DA_DUYET	admin	2026-01-16 03:44:03.59	\N	\N	\N	\N	\N
19	PDC202508002	35	46	GIAM	Phạt vi phạm quy chế	Seed data	DA_DUYET	admin	2026-01-16 03:44:03.59	\N	\N	\N	\N	\N
20	PDC202509002	48	76	TANG	Thưởng đột xuất	Seed data	DA_DUYET	admin	2026-01-16 03:44:03.59	\N	\N	\N	\N	\N
21	PDC202510002	62	70	TANG	Thưởng nóng	Seed data	DA_DUYET	admin	2026-01-16 03:44:03.59	\N	\N	\N	\N	\N
22	DC-UL-00021	91	40	GIAM	Khấu trừ ứng lương kỳ 2026-01 (UL2026-01-30)	\N	DA_DUYET	system	2026-01-16 07:34:26.504	system	2026-01-16 07:34:26.502	\N	\N	\N
23	DC-UL-00022	91	42	GIAM	Khấu trừ ứng lương kỳ 2026-01 (UL2026-01-30)	\N	DA_DUYET	system	2026-01-16 07:34:26.512	system	2026-01-16 07:34:26.511	\N	\N	\N
24	DC-UL-00023	91	50	GIAM	Khấu trừ ứng lương kỳ 2026-01 (UL2026-01-30)	\N	DA_DUYET	system	2026-01-16 07:34:26.517	system	2026-01-16 07:34:26.516	\N	\N	\N
25	DC-UL-00024	92	52	GIAM	Khấu trừ ứng lương kỳ 2026-01 (UL2026-01-27)	\N	DA_DUYET	admin	2026-01-20 06:21:29.066	admin	2026-01-20 06:21:29.065	\N	\N	\N
26	DC-UL-00025	92	53	GIAM	Khấu trừ ứng lương kỳ 2026-01 (UL2026-01-27)	\N	DA_DUYET	admin	2026-01-20 06:21:29.088	admin	2026-01-20 06:21:29.087	\N	\N	\N
27	DC-UL-00026	92	54	GIAM	Khấu trừ ứng lương kỳ 2026-01 (UL2026-01-27)	\N	DA_DUYET	admin	2026-01-20 06:21:29.098	admin	2026-01-20 06:21:29.098	\N	\N	\N
28	DC-UL-00027	92	56	GIAM	Khấu trừ ứng lương kỳ 2026-01 (UL2026-01-27)	\N	DA_DUYET	admin	2026-01-20 06:21:29.109	admin	2026-01-20 06:21:29.109	\N	\N	\N
29	DC-UL-00028	92	57	GIAM	Khấu trừ ứng lương kỳ 2026-01 (UL2026-01-27)	\N	DA_DUYET	admin	2026-01-20 06:21:29.12	admin	2026-01-20 06:21:29.119	\N	\N	\N
30	DC-UL-00029	92	58	GIAM	Khấu trừ ứng lương kỳ 2026-01 (UL2026-01-27)	\N	DA_DUYET	admin	2026-01-20 06:21:29.13	admin	2026-01-20 06:21:29.129	\N	\N	\N
31	DC-UL-00030	92	59	GIAM	Khấu trừ ứng lương kỳ 2026-01 (UL2026-01-27)	\N	DA_DUYET	admin	2026-01-20 06:21:29.14	admin	2026-01-20 06:21:29.139	\N	\N	\N
32	DC-UL-00031	92	60	GIAM	Khấu trừ ứng lương kỳ 2026-01 (UL2026-01-27)	\N	DA_DUYET	admin	2026-01-20 06:21:29.147	admin	2026-01-20 06:21:29.146	\N	\N	\N
33	DC-UL-00032	92	63	GIAM	Khấu trừ ứng lương kỳ 2026-01 (UL2026-01-27)	\N	DA_DUYET	admin	2026-01-20 06:21:29.156	admin	2026-01-20 06:21:29.155	\N	\N	\N
34	DC-UL-00033	92	64	GIAM	Khấu trừ ứng lương kỳ 2026-01 (UL2026-01-27)	\N	DA_DUYET	admin	2026-01-20 06:21:29.169	admin	2026-01-20 06:21:29.162	\N	\N	\N
35	DC-UL-00034	92	75	GIAM	Khấu trừ ứng lương kỳ 2026-01 (UL2026-01-27)	\N	DA_DUYET	admin	2026-01-20 06:21:29.177	admin	2026-01-20 06:21:29.177	\N	\N	\N
36	DC-UL-00035	97	40	GIAM	Khấu trừ ứng lương kỳ 2026-01 (UL-202601-10)	\N	DA_DUYET	admin	2026-01-20 08:21:17.125	admin	2026-01-20 08:21:17.125	\N	\N	\N
37	DC-UL-00036	97	42	GIAM	Khấu trừ ứng lương kỳ 2026-01 (UL-202601-10)	\N	DA_DUYET	admin	2026-01-20 08:21:17.142	admin	2026-01-20 08:21:17.142	\N	\N	\N
38	DC-UL-00037	97	50	GIAM	Khấu trừ ứng lương kỳ 2026-01 (UL-202601-10)	\N	DA_DUYET	admin	2026-01-20 08:21:17.154	admin	2026-01-20 08:21:17.153	\N	\N	\N
\.


--
-- Data for Name: phong_ban; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.phong_ban (id, ma_phong_ban, ten_phong_ban, mo_ta, trang_thai, phong_ban_cha_id, cap_do, loai_phong_ban, nguoi_quan_ly_id, gio_vao_chuan, gio_ra_chuan, phut_cho_phep_tre, quy_tac_ngay_cong, so_ngay_cong_thang, tao_boi, cap_nhat_boi, ngay_tao, ngay_cap_nhat) FROM stdin;
29	SHIP	Giao Hàng		NGUNG_HOAT_DONG	\N	1	\N	\N	04:00	16:00	5	SAT_HALF_SUN_OFF	\N	\N	\N	2026-01-15 03:53:27.281	2026-01-15 03:55:23.7
23	KT	Kế toán	Phòng Kế toán - Tài chính	NGUNG_HOAT_DONG	\N	1	\N	\N	08:00	17:00	5	SAT_HALF_SUN_OFF	\N	\N	\N	2026-01-15 03:53:27.281	2026-01-15 03:55:29.704
27	CH	Chia hàng	Bộ phận Chia hàng	HOAT_DONG	26	1	SAN_XUAT	\N	06:00	15:00	10	SAT_HALF_SUN_OFF	\N	\N	\N	2026-01-15 03:53:27.281	2026-01-15 04:13:11.403
25	DH	Đơn hàng	Phòng Quản lý đơn hàng	HOAT_DONG	26	1	VAN_HANH	\N	07:30	16:30	5	SAT_HALF_SUN_OFF	\N	\N	\N	2026-01-15 03:53:27.281	2026-01-15 04:13:46.734
33	TM	Thu mua		HOAT_DONG	26	1	SAN_XUAT	\N	08:00	17:00	5	SAT_HALF_SUN_OFF	\N	\N	\N	2026-01-15 03:53:27.281	2026-01-15 04:14:26.719
34	VP	Khối Văn Phòng		HOAT_DONG	\N	1	VAN_PHONG	\N	07:00	16:00	5	SAT_HALF_SUN_OFF	\N	\N	\N	2026-01-15 04:15:10.214	2026-01-15 04:15:10.214
26	KV	Kho vận	Phòng Kho vận - Logistics	HOAT_DONG	\N	1	SAN_XUAT	\N	06:00	15:00	10	SAT_HALF_SUN_OFF	\N	\N	\N	2026-01-15 03:53:27.281	2026-01-15 04:15:20.277
30	KE_TOAN	Kế Toán	Phòng Kế Toán	HOAT_DONG	34	1	VAN_HANH	\N	07:00	16:00	5	SAT_HALF_SUN_OFF	\N	\N	\N	2026-01-15 03:53:27.281	2026-01-15 04:15:50.501
24	MKT	Marketing	Phòng Kinh doanh và Marketing	HOAT_DONG	34	1	VAN_HANH	\N	07:00	16:00	10	SAT_HALF_SUN_OFF	\N	\N	\N	2026-01-15 03:53:27.281	2026-01-15 04:16:09.356
28	NS	Nhân Sự	Phòng Nhân Sự	HOAT_DONG	34	1	VAN_HANH	\N	07:00	16:00	5	SAT_HALF_SUN_OFF	\N	\N	\N	2026-01-15 03:53:27.281	2026-01-15 04:16:23.817
31	KINH_DOANH	Kinh Doanh	Phòng Kinh Doanh	HOAT_DONG	34	1	KINH_DOANH	\N	07:00	16:00	5	SAT_HALF_SUN_OFF	\N	\N	\N	2026-01-15 03:53:27.281	2026-01-15 04:16:34.511
32	GIAO_HANG	Giao hàng	Phòng Giao hàng	HOAT_DONG	26	1	SAN_XUAT	\N	08:00	17:00	5	SAT_HALF_SUN_OFF	\N	\N	\N	2026-01-15 03:53:27.281	2026-01-21 03:33:57.495
\.


--
-- Data for Name: phu_cap_nhan_vien; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.phu_cap_nhan_vien (id, nhan_vien_id, khoan_luong_id, so_tien, tu_ngay, den_ngay, ghi_chu, trang_thai, nguoi_tao, ngay_tao, ngay_cap_nhat) FROM stdin;
4	40	23	631810	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
5	42	23	373081	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
6	44	23	716923	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
7	45	23	447455	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
8	46	23	637846	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
9	47	23	734765	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
10	48	23	673570	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
11	49	23	538921	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
12	50	23	405383	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
13	52	23	431917	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
14	53	23	700692	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
15	54	23	547146	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
16	55	23	669552	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
17	56	23	621619	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
18	57	23	602508	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
19	58	23	702243	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
20	59	23	393035	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
21	60	23	314510	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
22	63	23	358689	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
23	64	23	670927	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
24	65	23	684050	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
25	66	23	691283	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
26	67	23	361334	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
27	68	23	523305	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
28	69	23	426292	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
29	70	23	490811	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
30	71	23	339135	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
31	72	23	744452	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
32	73	23	748545	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
33	74	23	534318	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
34	75	23	505386	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
35	76	23	399507	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
36	77	23	439717	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.562	2026-01-16 03:38:21.562
37	40	25	532145	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
38	42	25	637245	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
39	44	25	808548	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
40	45	25	558519	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
41	46	25	708487	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
42	47	25	775269	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
43	48	25	582355	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
44	49	25	994590	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
45	50	25	501813	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
46	52	25	719543	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
47	53	25	610560	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
48	54	25	657846	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
49	55	25	760411	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
50	56	25	670704	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
51	57	25	724657	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
52	58	25	881605	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
53	59	25	936686	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
54	60	25	784829	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
55	63	25	674529	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
56	64	25	530497	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
57	65	25	501014	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
58	66	25	563170	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
59	67	25	754407	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
60	68	25	825484	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
61	69	25	585503	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
62	70	25	900318	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
63	71	25	729132	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
64	72	25	611735	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
65	73	25	622927	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
66	74	25	948057	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
67	75	25	970823	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
68	76	25	753316	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
69	77	25	719253	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.569	2026-01-16 03:38:21.569
70	40	26	870094	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
71	42	26	782342	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
72	44	26	901445	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
73	45	26	634602	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
74	46	26	615061	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
75	47	26	998218	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
76	48	26	707148	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
77	49	26	517249	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
78	50	26	857741	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
79	52	26	714076	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
80	53	26	571663	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
81	54	26	757840	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
82	55	26	552483	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
83	56	26	662074	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
84	57	26	796608	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
85	58	26	922374	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
86	59	26	892738	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
87	60	26	825739	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
88	63	26	550014	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
89	64	26	972679	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
90	65	26	642133	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
91	66	26	625306	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
92	67	26	687698	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
93	68	26	723847	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
94	69	26	859317	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
95	70	26	583051	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
96	71	26	862115	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
97	72	26	507011	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
98	73	26	552262	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
99	74	26	896457	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
100	75	26	901417	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
101	76	26	631336	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
102	77	26	973187	2025-01-01 00:00:00	\N	Seed data 2025	HIEU_LUC	\N	2026-01-16 03:38:21.573	2026-01-16 03:38:21.573
\.


--
-- Data for Name: quy_che; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quy_che (id, phong_ban_id, ten_quy_che, mo_ta, tu_ngay, den_ngay, phien_ban, trang_thai, nguoi_tao, ngay_tao, ngay_cap_nhat) FROM stdin;
1	27	KPI Chia hàng		2026-01-01 00:00:00	\N	1	HIEU_LUC	\N	2026-01-16 00:31:13.436	2026-01-16 00:31:13.436
2	32	KPI Giao hàng	Quy chế tính lương theo sản lượng giao hàng	2026-01-01 00:00:00	\N	1	HIEU_LUC	\N	2026-01-20 07:58:04.171	2026-01-20 07:58:04.171
\.


--
-- Data for Name: quy_che_rule; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quy_che_rule (id, quy_che_id, khoan_luong_id, ten_rule, mo_ta, loai_rule, dieu_kien_json, cong_thuc_json, thu_tu_uu_tien, che_do_gop, cho_phep_chinh_tay, trang_thai, nguoi_tao, ngay_tao, ngay_cap_nhat) FROM stdin;
1	1	42	Tính tiền sản lượng chia hàng	TONG_SP_DAT * DON_GIA_SP	CONG_THUC	\N	{"bieuThuc": "TONG_SP_DAT * DON_GIA_SP"}	1	GHI_DE	t	t	\N	2026-01-20 07:57:48.576	2026-01-20 07:57:48.576
2	1	44	Phạt sản phẩm lỗi	TONG_SP_LOI * DON_GIA_SP * HE_SO_LOI_SP	CONG_THUC	\N	{"bieuThuc": "TONG_SP_LOI * DON_GIA_SP * HE_SO_LOI_SP"}	2	GHI_DE	t	t	\N	2026-01-20 07:57:56.034	2026-01-20 07:57:56.034
3	2	43	Tính tiền sản lượng giao hàng	TONG_KHOI_LUONG_THANH_CONG * DON_GIA_KHOI_LUONG	CONG_THUC	\N	{"bieuThuc": "TONG_KHOI_LUONG_THANH_CONG * DON_GIA_KHOI_LUONG"}	1	GHI_DE	t	t	\N	2026-01-20 07:58:12.374	2026-01-20 07:58:12.374
\.


--
-- Data for Name: quyen; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.quyen (id, ma_quyen, ten_quyen, nhom_quyen, mo_ta, ngay_tao) FROM stdin;
1	CA_LAM_VIEC_VIEW	Xem ca làm việc	XEP_CA	Quyền xem danh mục ca làm việc	2026-01-23 05:56:37.519
2	CA_LAM_VIEC_MANAGE	Quản lý ca làm việc	XEP_CA	Quyền thêm/sửa/xóa ca làm việc	2026-01-23 05:56:37.519
3	PHAN_CA_VIEW	Xem lịch phân ca	XEP_CA	Quyền xem lịch phân ca	2026-01-23 05:56:37.519
4	PHAN_CA_MANAGE	Quản lý lịch phân ca	XEP_CA	Quyền tạo/sửa lịch phân ca	2026-01-23 05:56:37.519
5	PHAN_CA_PUBLISH	Công bố lịch phân ca	XEP_CA	Quyền publish lịch phân ca	2026-01-23 05:56:37.519
6	LICH_LAM_VIEC_MY_VIEW	Xem lịch làm của tôi	XEP_CA	Nhân viên xem lịch cá nhân	2026-01-23 05:56:37.519
\.


--
-- Data for Name: request_mapping_cham_cong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.request_mapping_cham_cong (id, don_yeu_cau_id, nhan_vien_id, ngay, loai_mapping, so_gio_ap_dung, ghi_chu, da_ap_dung, ngay_ap_dung, ky_luong_id, is_locked, ngay_tao) FROM stdin;
\.


--
-- Data for Name: request_workflow_config; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.request_workflow_config (id, loai_yeu_cau_id, phong_ban_id, so_cap, nguoi_duyet_1, nguoi_duyet_cu_the_1_id, nguoi_duyet_2, nguoi_duyet_cu_the_2_id, tu_dong_duyet_neu_qua_han, so_ngay_qua_han, yeu_cau_ly_do_tu_choi, yeu_cau_ly_do_override, is_active, tao_boi, cap_nhat_boi, ngay_tao, ngay_cap_nhat) FROM stdin;
\.


--
-- Data for Name: rule_trace; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rule_trace (id, bang_luong_id, nhan_vien_id, quy_che_id, quy_che_rule_id, khoan_luong_id, input_json, output_so_tien, message_giai_thich, tao_luc) FROM stdin;
23	94	65	2	3	43	{"luongCoBan":6000000,"capTrachNhiem":0,"heSoTrachNhiem":1,"LUONG_CO_BAN":6000000,"HE_SO_TRACH_NHIEM":1,"CAP_TRACH_NHIEM":0,"CONG_CHUAN":26,"CONG_THUC_TE":26,"SO_GIO_OT":0,"SO_GIO_OT_DEM":0,"SO_GIO_OT_CN":0,"SO_GIO_OT_LE":0,"SO_LAN_DI_MUON":0,"SO_LAN_VE_SOM":0,"TONG_SP_DAT":0,"TONG_SP_LOI":0,"TONG_KHOI_LUONG_THANH_CONG":2230.05,"TONG_SO_LAN_TRE_GIO":2,"TONG_SO_LAN_KHONG_LAY_PHIEU":3,"DON_GIA_KHOI_LUONG":500,"DON_GIA_PHAT_TRE":50000,"DON_GIA_SP":320,"HE_SO_LOI_SP":5,"DON_GIA_PHAT_PHIEU":50000}	1115025	TONG_KHOI_LUONG_THANH_CONG * DON_GIA_KHOI_LUONG = 1.115.025đ	2026-01-20 07:58:57.008
24	94	66	2	3	43	{"luongCoBan":6000000,"capTrachNhiem":0,"heSoTrachNhiem":1,"LUONG_CO_BAN":6000000,"HE_SO_TRACH_NHIEM":1,"CAP_TRACH_NHIEM":0,"CONG_CHUAN":26,"CONG_THUC_TE":26,"SO_GIO_OT":0,"SO_GIO_OT_DEM":0,"SO_GIO_OT_CN":0,"SO_GIO_OT_LE":0,"SO_LAN_DI_MUON":0,"SO_LAN_VE_SOM":0,"TONG_SP_DAT":0,"TONG_SP_LOI":0,"TONG_KHOI_LUONG_THANH_CONG":2320.62,"TONG_SO_LAN_TRE_GIO":2,"TONG_SO_LAN_KHONG_LAY_PHIEU":0,"DON_GIA_KHOI_LUONG":500,"DON_GIA_PHAT_TRE":50000,"DON_GIA_SP":320,"HE_SO_LOI_SP":5,"DON_GIA_PHAT_PHIEU":50000}	1160310	TONG_KHOI_LUONG_THANH_CONG * DON_GIA_KHOI_LUONG = 1.160.310đ	2026-01-20 07:58:57.022
25	94	67	2	3	43	{"luongCoBan":6000000,"capTrachNhiem":0,"heSoTrachNhiem":1,"LUONG_CO_BAN":6000000,"HE_SO_TRACH_NHIEM":1,"CAP_TRACH_NHIEM":0,"CONG_CHUAN":26,"CONG_THUC_TE":26,"SO_GIO_OT":0,"SO_GIO_OT_DEM":0,"SO_GIO_OT_CN":0,"SO_GIO_OT_LE":0,"SO_LAN_DI_MUON":0,"SO_LAN_VE_SOM":0,"TONG_SP_DAT":0,"TONG_SP_LOI":0,"TONG_KHOI_LUONG_THANH_CONG":2027.95,"TONG_SO_LAN_TRE_GIO":4,"TONG_SO_LAN_KHONG_LAY_PHIEU":4,"DON_GIA_KHOI_LUONG":500,"DON_GIA_PHAT_TRE":50000,"DON_GIA_SP":320,"HE_SO_LOI_SP":5,"DON_GIA_PHAT_PHIEU":50000}	1013975	TONG_KHOI_LUONG_THANH_CONG * DON_GIA_KHOI_LUONG = 1.013.975đ	2026-01-20 07:58:57.03
26	94	68	2	3	43	{"luongCoBan":4500000,"capTrachNhiem":0,"heSoTrachNhiem":1,"LUONG_CO_BAN":4500000,"HE_SO_TRACH_NHIEM":1,"CAP_TRACH_NHIEM":0,"CONG_CHUAN":26,"CONG_THUC_TE":26,"SO_GIO_OT":0,"SO_GIO_OT_DEM":0,"SO_GIO_OT_CN":0,"SO_GIO_OT_LE":0,"SO_LAN_DI_MUON":0,"SO_LAN_VE_SOM":0,"TONG_SP_DAT":0,"TONG_SP_LOI":0,"TONG_KHOI_LUONG_THANH_CONG":2315,"TONG_SO_LAN_TRE_GIO":1,"TONG_SO_LAN_KHONG_LAY_PHIEU":0,"DON_GIA_KHOI_LUONG":500,"DON_GIA_PHAT_TRE":50000,"DON_GIA_SP":320,"HE_SO_LOI_SP":5,"DON_GIA_PHAT_PHIEU":50000}	1157500	TONG_KHOI_LUONG_THANH_CONG * DON_GIA_KHOI_LUONG = 1.157.500đ	2026-01-20 07:58:57.039
27	94	71	2	3	43	{"luongCoBan":4500000,"capTrachNhiem":0,"heSoTrachNhiem":1,"LUONG_CO_BAN":4500000,"HE_SO_TRACH_NHIEM":1,"CAP_TRACH_NHIEM":0,"CONG_CHUAN":26,"CONG_THUC_TE":26,"SO_GIO_OT":0,"SO_GIO_OT_DEM":0,"SO_GIO_OT_CN":0,"SO_GIO_OT_LE":0,"SO_LAN_DI_MUON":0,"SO_LAN_VE_SOM":0,"TONG_SP_DAT":0,"TONG_SP_LOI":0,"TONG_KHOI_LUONG_THANH_CONG":1903.42,"TONG_SO_LAN_TRE_GIO":6,"TONG_SO_LAN_KHONG_LAY_PHIEU":6,"DON_GIA_KHOI_LUONG":500,"DON_GIA_PHAT_TRE":50000,"DON_GIA_SP":320,"HE_SO_LOI_SP":5,"DON_GIA_PHAT_PHIEU":50000}	951710	TONG_KHOI_LUONG_THANH_CONG * DON_GIA_KHOI_LUONG = 951.710đ	2026-01-20 07:58:57.047
28	94	72	2	3	43	{"luongCoBan":4500000,"capTrachNhiem":0,"heSoTrachNhiem":1,"LUONG_CO_BAN":4500000,"HE_SO_TRACH_NHIEM":1,"CAP_TRACH_NHIEM":0,"CONG_CHUAN":26,"CONG_THUC_TE":26,"SO_GIO_OT":0,"SO_GIO_OT_DEM":0,"SO_GIO_OT_CN":0,"SO_GIO_OT_LE":0,"SO_LAN_DI_MUON":0,"SO_LAN_VE_SOM":0,"TONG_SP_DAT":0,"TONG_SP_LOI":0,"TONG_KHOI_LUONG_THANH_CONG":1833.73,"TONG_SO_LAN_TRE_GIO":6,"TONG_SO_LAN_KHONG_LAY_PHIEU":3,"DON_GIA_KHOI_LUONG":500,"DON_GIA_PHAT_TRE":50000,"DON_GIA_SP":320,"HE_SO_LOI_SP":5,"DON_GIA_PHAT_PHIEU":50000}	916865	TONG_KHOI_LUONG_THANH_CONG * DON_GIA_KHOI_LUONG = 916.865đ	2026-01-20 07:58:57.057
\.


--
-- Data for Name: san_luong_chia_hang; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.san_luong_chia_hang (id, ngay, nhan_vien_id, so_luong_sp_dat, so_luong_sp_loi, ghi_chu, nguon_du_lieu, import_id, khoa_sua, tao_boi, tao_luc, cap_nhat_boi, cap_nhat_luc) FROM stdin;
1	2025-06-02	52	334	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
2	2025-06-03	52	175	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
3	2025-06-04	52	271	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
4	2025-06-05	52	213	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
5	2025-06-06	52	393	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
6	2025-06-07	52	383	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
7	2025-06-09	52	192	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
8	2025-06-10	52	259	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
9	2025-06-11	52	156	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
10	2025-06-12	52	269	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
11	2025-06-13	52	204	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
12	2025-06-14	52	214	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
13	2025-06-16	52	288	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
14	2025-06-17	52	260	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
15	2025-06-18	52	309	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
16	2025-06-19	52	392	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
17	2025-06-20	52	288	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
18	2025-06-21	52	258	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
19	2025-06-23	52	219	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
20	2025-06-24	52	215	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
21	2025-06-25	52	366	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
22	2025-06-26	52	286	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
23	2025-06-27	52	398	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
24	2025-06-28	52	343	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
25	2025-07-01	52	310	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
26	2025-07-02	52	267	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
27	2025-07-03	52	371	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
28	2025-07-04	52	162	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
29	2025-07-05	52	304	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
30	2025-07-07	52	192	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
31	2025-07-08	52	240	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
32	2025-07-09	52	382	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
33	2025-07-10	52	207	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
34	2025-07-11	52	399	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
35	2025-07-12	52	338	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
36	2025-07-14	52	304	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
37	2025-07-15	52	205	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
38	2025-07-16	52	188	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
39	2025-07-17	52	258	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
40	2025-07-18	52	358	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
41	2025-07-19	52	386	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
42	2025-07-21	52	330	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
43	2025-07-22	52	264	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
44	2025-07-23	52	374	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
45	2025-07-24	52	235	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
46	2025-07-25	52	206	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
47	2025-07-26	52	379	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
48	2025-07-28	52	269	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
49	2025-08-01	52	165	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
50	2025-08-02	52	190	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
51	2025-08-04	52	311	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
52	2025-08-05	52	337	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
53	2025-08-06	52	342	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
54	2025-08-07	52	284	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
55	2025-08-08	52	396	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
56	2025-08-09	52	383	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
57	2025-08-11	52	262	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
58	2025-08-12	52	266	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
59	2025-08-13	52	324	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
60	2025-08-14	52	193	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
61	2025-08-15	52	248	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
62	2025-08-16	52	367	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
63	2025-08-18	52	344	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
64	2025-08-19	52	332	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
65	2025-08-20	52	292	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
66	2025-08-21	52	325	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
67	2025-08-22	52	268	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
68	2025-08-23	52	331	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
69	2025-08-25	52	221	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
70	2025-08-26	52	326	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
71	2025-08-27	52	187	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
72	2025-08-28	52	375	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
73	2025-09-01	52	307	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
74	2025-09-02	52	376	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
75	2025-09-03	52	210	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
76	2025-09-04	52	385	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
77	2025-09-05	52	163	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
78	2025-09-06	52	157	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
79	2025-09-08	52	153	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
80	2025-09-09	52	357	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
81	2025-09-10	52	255	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
82	2025-09-11	52	155	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
83	2025-09-12	52	230	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
84	2025-09-13	52	161	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
85	2025-09-15	52	264	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
86	2025-09-16	52	161	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
87	2025-09-17	52	323	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
88	2025-09-18	52	152	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
89	2025-09-19	52	320	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
90	2025-09-20	52	189	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
91	2025-09-22	52	236	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
92	2025-09-23	52	326	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
93	2025-09-24	52	246	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
94	2025-09-25	52	250	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
95	2025-09-26	52	253	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
96	2025-09-27	52	227	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
97	2025-10-01	52	325	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
98	2025-10-02	52	329	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
99	2025-10-03	52	163	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
100	2025-10-04	52	206	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
101	2025-10-06	52	159	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
102	2025-10-07	52	285	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
103	2025-10-08	52	374	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
104	2025-10-09	52	252	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
105	2025-10-10	52	397	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
106	2025-10-11	52	297	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
107	2025-10-13	52	347	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
108	2025-10-14	52	201	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
109	2025-10-15	52	159	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
110	2025-10-16	52	359	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
111	2025-10-17	52	290	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
112	2025-10-18	52	213	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
113	2025-10-20	52	206	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
114	2025-10-21	52	312	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
115	2025-10-22	52	202	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
116	2025-10-23	52	397	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
117	2025-10-24	52	288	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
118	2025-10-25	52	315	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
119	2025-10-27	52	333	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
120	2025-10-28	52	360	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
121	2025-11-01	52	279	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
122	2025-11-03	52	245	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
123	2025-11-04	52	209	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
124	2025-11-05	52	288	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
125	2025-11-06	52	374	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
126	2025-11-07	52	313	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
127	2025-11-08	52	381	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
128	2025-11-10	52	230	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
129	2025-11-11	52	200	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
130	2025-11-12	52	313	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
131	2025-11-13	52	228	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
132	2025-11-14	52	189	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
133	2025-11-15	52	206	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
134	2025-11-17	52	396	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
135	2025-11-18	52	295	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
136	2025-11-19	52	251	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
137	2025-11-20	52	298	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
138	2025-11-21	52	255	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
139	2025-11-22	52	280	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
140	2025-11-24	52	278	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
141	2025-11-25	52	207	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
142	2025-11-26	52	180	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
143	2025-11-27	52	181	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
144	2025-11-28	52	348	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
145	2025-12-01	52	190	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
146	2025-12-02	52	394	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
147	2025-12-03	52	249	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
148	2025-12-04	52	237	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
149	2025-12-05	52	324	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
150	2025-12-06	52	299	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
151	2025-12-08	52	347	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
152	2025-12-09	52	221	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
153	2025-12-10	52	233	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
154	2025-12-11	52	188	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
155	2025-12-12	52	382	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
156	2025-12-13	52	290	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
157	2025-12-15	52	288	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
158	2025-12-16	52	331	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
159	2025-12-17	52	158	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
160	2025-12-18	52	268	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
161	2025-12-19	52	376	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
162	2025-12-20	52	234	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
163	2025-12-22	52	354	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
164	2025-12-23	52	330	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
165	2025-12-24	52	364	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
166	2025-12-25	52	322	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
167	2025-12-26	52	247	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
168	2025-12-27	52	343	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
169	2025-06-02	53	308	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
170	2025-06-03	53	178	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
171	2025-06-04	53	187	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
172	2025-06-05	53	360	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
173	2025-06-06	53	171	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
174	2025-06-07	53	395	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
175	2025-06-09	53	332	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
176	2025-06-10	53	320	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
177	2025-06-11	53	163	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
178	2025-06-12	53	235	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
179	2025-06-13	53	371	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
180	2025-06-14	53	333	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
181	2025-06-16	53	347	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
182	2025-06-17	53	304	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
183	2025-06-18	53	332	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
184	2025-06-19	53	200	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
185	2025-06-20	53	383	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
186	2025-06-21	53	351	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
187	2025-06-23	53	306	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
188	2025-06-24	53	190	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
189	2025-06-25	53	251	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
190	2025-06-26	53	357	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
191	2025-06-27	53	269	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
192	2025-06-28	53	188	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
193	2025-07-01	53	222	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
194	2025-07-02	53	182	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
195	2025-07-03	53	220	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
196	2025-07-04	53	172	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
197	2025-07-05	53	299	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
198	2025-07-07	53	381	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
199	2025-07-08	53	323	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
200	2025-07-09	53	214	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
201	2025-07-10	53	172	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
202	2025-07-11	53	327	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
203	2025-07-12	53	235	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
204	2025-07-14	53	234	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
205	2025-07-15	53	313	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
206	2025-07-16	53	161	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
207	2025-07-17	53	392	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
208	2025-07-18	53	289	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
209	2025-07-19	53	368	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
210	2025-07-21	53	221	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
211	2025-07-22	53	291	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
212	2025-07-23	53	231	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
213	2025-07-24	53	209	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
214	2025-07-25	53	252	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
215	2025-07-26	53	357	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
216	2025-07-28	53	165	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
217	2025-08-01	53	203	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
218	2025-08-02	53	281	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
219	2025-08-04	53	274	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
220	2025-08-05	53	247	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
221	2025-08-06	53	330	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
222	2025-08-07	53	292	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
223	2025-08-08	53	196	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
224	2025-08-09	53	389	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
225	2025-08-11	53	355	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
226	2025-08-12	53	365	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
227	2025-08-13	53	296	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
228	2025-08-14	53	150	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
229	2025-08-15	53	198	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
230	2025-08-16	53	339	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
231	2025-08-18	53	370	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
232	2025-08-19	53	387	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
233	2025-08-20	53	320	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
234	2025-08-21	53	267	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
235	2025-08-22	53	228	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
236	2025-08-23	53	287	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
237	2025-08-25	53	210	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
238	2025-08-26	53	245	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
239	2025-08-27	53	366	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
240	2025-08-28	53	376	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
241	2025-09-01	53	338	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
242	2025-09-02	53	308	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
243	2025-09-03	53	239	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
244	2025-09-04	53	297	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
245	2025-09-05	53	213	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
246	2025-09-06	53	398	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
247	2025-09-08	53	241	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
248	2025-09-09	53	237	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
249	2025-09-10	53	310	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
250	2025-09-11	53	327	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
251	2025-09-12	53	271	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
252	2025-09-13	53	394	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
253	2025-09-15	53	310	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
254	2025-09-16	53	302	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
255	2025-09-17	53	388	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
256	2025-09-18	53	385	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
257	2025-09-19	53	393	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
258	2025-09-20	53	330	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
259	2025-09-22	53	256	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
260	2025-09-23	53	177	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
261	2025-09-24	53	150	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
262	2025-09-25	53	212	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
263	2025-09-26	53	294	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
264	2025-09-27	53	266	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
265	2025-10-01	53	332	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
266	2025-10-02	53	262	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
267	2025-10-03	53	159	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
268	2025-10-04	53	365	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
269	2025-10-06	53	320	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
270	2025-10-07	53	239	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
271	2025-10-08	53	227	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
272	2025-10-09	53	348	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
273	2025-10-10	53	228	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
274	2025-10-11	53	376	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
275	2025-10-13	53	217	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
276	2025-10-14	53	196	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
277	2025-10-15	53	396	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
278	2025-10-16	53	214	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
279	2025-10-17	53	263	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
280	2025-10-18	53	151	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
281	2025-10-20	53	185	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
282	2025-10-21	53	345	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
283	2025-10-22	53	171	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
284	2025-10-23	53	199	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
285	2025-10-24	53	361	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
286	2025-10-25	53	262	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
287	2025-10-27	53	302	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
288	2025-10-28	53	227	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
289	2025-11-01	53	251	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
290	2025-11-03	53	354	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
291	2025-11-04	53	293	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
292	2025-11-05	53	379	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
293	2025-11-06	53	241	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
294	2025-11-07	53	302	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
295	2025-11-08	53	231	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
296	2025-11-10	53	356	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
297	2025-11-11	53	339	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
298	2025-11-12	53	359	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
299	2025-11-13	53	286	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
300	2025-11-14	53	255	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
301	2025-11-15	53	241	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
302	2025-11-17	53	287	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
303	2025-11-18	53	375	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
304	2025-11-19	53	277	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
305	2025-11-20	53	303	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
306	2025-11-21	53	171	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
307	2025-11-22	53	178	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
308	2025-11-24	53	375	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
309	2025-11-25	53	338	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
310	2025-11-26	53	339	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
311	2025-11-27	53	390	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
312	2025-11-28	53	399	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
313	2025-12-01	53	375	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
314	2025-12-02	53	234	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
315	2025-12-03	53	196	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
316	2025-12-04	53	239	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
317	2025-12-05	53	351	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
318	2025-12-06	53	150	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
319	2025-12-08	53	384	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
320	2025-12-09	53	172	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
321	2025-12-10	53	238	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
322	2025-12-11	53	182	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
323	2025-12-12	53	200	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
324	2025-12-13	53	367	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
325	2025-12-15	53	303	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
326	2025-12-16	53	384	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
327	2025-12-17	53	275	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
328	2025-12-18	53	168	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
329	2025-12-19	53	305	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
330	2025-12-20	53	215	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
331	2025-12-22	53	282	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
332	2025-12-23	53	261	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
333	2025-12-24	53	319	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
334	2025-12-25	53	396	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
335	2025-12-26	53	333	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
336	2025-12-27	53	340	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
337	2025-06-02	54	360	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
338	2025-06-03	54	171	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
339	2025-06-04	54	323	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
340	2025-06-05	54	271	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
341	2025-06-06	54	156	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
342	2025-06-07	54	213	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
343	2025-06-09	54	221	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
344	2025-06-10	54	363	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
345	2025-06-11	54	223	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
346	2025-06-12	54	349	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
347	2025-06-13	54	334	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
348	2025-06-14	54	313	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
349	2025-06-16	54	393	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
350	2025-06-17	54	246	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
351	2025-06-18	54	334	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
352	2025-06-19	54	313	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
353	2025-06-20	54	304	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
354	2025-06-21	54	363	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
355	2025-06-23	54	272	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
356	2025-06-24	54	337	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
357	2025-06-25	54	282	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
358	2025-06-26	54	371	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
359	2025-06-27	54	329	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
360	2025-06-28	54	218	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
361	2025-07-01	54	329	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
362	2025-07-02	54	255	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
363	2025-07-03	54	187	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
364	2025-07-04	54	322	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
365	2025-07-05	54	391	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
366	2025-07-07	54	394	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
367	2025-07-08	54	155	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
368	2025-07-09	54	372	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
369	2025-07-10	54	286	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
370	2025-07-11	54	341	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
371	2025-07-12	54	383	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
372	2025-07-14	54	164	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
373	2025-07-15	54	207	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
374	2025-07-16	54	182	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
375	2025-07-17	54	303	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
376	2025-07-18	54	223	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
377	2025-07-19	54	207	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
378	2025-07-21	54	235	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
379	2025-07-22	54	162	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
380	2025-07-23	54	396	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
381	2025-07-24	54	343	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
382	2025-07-25	54	182	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
383	2025-07-26	54	345	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
384	2025-07-28	54	353	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
385	2025-08-01	54	249	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
386	2025-08-02	54	394	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
387	2025-08-04	54	265	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
388	2025-08-05	54	223	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
389	2025-08-06	54	188	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
390	2025-08-07	54	150	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
391	2025-08-08	54	220	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
392	2025-08-09	54	288	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
393	2025-08-11	54	291	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
394	2025-08-12	54	306	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
395	2025-08-13	54	219	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
396	2025-08-14	54	323	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
397	2025-08-15	54	231	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
398	2025-08-16	54	219	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
399	2025-08-18	54	200	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
400	2025-08-19	54	391	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
401	2025-08-20	54	323	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
402	2025-08-21	54	158	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
403	2025-08-22	54	342	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
404	2025-08-23	54	293	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
405	2025-08-25	54	267	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
406	2025-08-26	54	256	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
407	2025-08-27	54	156	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
408	2025-08-28	54	226	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
409	2025-09-01	54	316	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
410	2025-09-02	54	181	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
411	2025-09-03	54	365	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
412	2025-09-04	54	367	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
413	2025-09-05	54	305	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
414	2025-09-06	54	346	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
415	2025-09-08	54	276	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
416	2025-09-09	54	289	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
417	2025-09-10	54	228	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
418	2025-09-11	54	291	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
419	2025-09-12	54	395	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
420	2025-09-13	54	286	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
421	2025-09-15	54	282	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
422	2025-09-16	54	352	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
423	2025-09-17	54	343	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
424	2025-09-18	54	318	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
425	2025-09-19	54	170	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
426	2025-09-20	54	353	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
427	2025-09-22	54	254	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
428	2025-09-23	54	193	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
429	2025-09-24	54	185	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
430	2025-09-25	54	279	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
431	2025-09-26	54	293	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
432	2025-09-27	54	308	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
433	2025-10-01	54	332	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
434	2025-10-02	54	177	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
435	2025-10-03	54	316	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
436	2025-10-04	54	348	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
437	2025-10-06	54	369	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
438	2025-10-07	54	169	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
439	2025-10-08	54	197	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
440	2025-10-09	54	328	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
441	2025-10-10	54	343	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
442	2025-10-11	54	253	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
443	2025-10-13	54	263	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
444	2025-10-14	54	251	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
445	2025-10-15	54	313	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
446	2025-10-16	54	278	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
447	2025-10-17	54	278	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
448	2025-10-18	54	319	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
449	2025-10-20	54	364	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
450	2025-10-21	54	245	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
451	2025-10-22	54	358	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
452	2025-10-23	54	267	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
453	2025-10-24	54	151	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
454	2025-10-25	54	304	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
455	2025-10-27	54	399	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
456	2025-10-28	54	391	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
457	2025-11-01	54	399	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
458	2025-11-03	54	302	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
459	2025-11-04	54	221	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
460	2025-11-05	54	195	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
461	2025-11-06	54	319	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
462	2025-11-07	54	312	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
463	2025-11-08	54	304	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
464	2025-11-10	54	284	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
465	2025-11-11	54	169	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
466	2025-11-12	54	377	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
467	2025-11-13	54	274	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
468	2025-11-14	54	331	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
469	2025-11-15	54	330	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
470	2025-11-17	54	372	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
471	2025-11-18	54	208	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
472	2025-11-19	54	173	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
473	2025-11-20	54	271	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
474	2025-11-21	54	179	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
475	2025-11-22	54	165	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
476	2025-11-24	54	332	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
477	2025-11-25	54	292	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
478	2025-11-26	54	157	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
479	2025-11-27	54	165	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
480	2025-11-28	54	378	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
481	2025-12-01	54	314	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
482	2025-12-02	54	204	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
483	2025-12-03	54	210	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
484	2025-12-04	54	188	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
485	2025-12-05	54	252	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
486	2025-12-06	54	275	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
487	2025-12-08	54	221	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
488	2025-12-09	54	221	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
489	2025-12-10	54	212	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
490	2025-12-11	54	341	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
491	2025-12-12	54	277	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
492	2025-12-13	54	179	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
493	2025-12-15	54	298	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
494	2025-12-16	54	238	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
495	2025-12-17	54	331	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
496	2025-12-18	54	349	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
497	2025-12-19	54	255	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
498	2025-12-20	54	190	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
499	2025-12-22	54	180	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
500	2025-12-23	54	215	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
501	2025-12-24	54	186	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
502	2025-12-25	54	379	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
503	2025-12-26	54	219	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
504	2025-12-27	54	265	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
505	2025-06-02	56	249	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
506	2025-06-03	56	383	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
507	2025-06-04	56	359	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
508	2025-06-05	56	313	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
509	2025-06-06	56	398	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
510	2025-06-07	56	162	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
511	2025-06-09	56	330	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
512	2025-06-10	56	355	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
513	2025-06-11	56	194	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
514	2025-06-12	56	220	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
515	2025-06-13	56	398	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
516	2025-06-14	56	217	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
517	2025-06-16	56	253	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
518	2025-06-17	56	390	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
519	2025-06-18	56	189	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
520	2025-06-19	56	156	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
521	2025-06-20	56	203	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
522	2025-06-21	56	340	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
523	2025-06-23	56	250	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
524	2025-06-24	56	286	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
525	2025-06-25	56	167	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
526	2025-06-26	56	328	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
527	2025-06-27	56	266	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
528	2025-06-28	56	347	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
529	2025-07-01	56	365	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
530	2025-07-02	56	341	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
531	2025-07-03	56	198	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
532	2025-07-04	56	398	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
533	2025-07-05	56	392	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
534	2025-07-07	56	387	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
535	2025-07-08	56	382	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
536	2025-07-09	56	274	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
537	2025-07-10	56	215	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
538	2025-07-11	56	395	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
539	2025-07-12	56	209	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
540	2025-07-14	56	209	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
541	2025-07-15	56	153	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
542	2025-07-16	56	384	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
543	2025-07-17	56	252	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
544	2025-07-18	56	327	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
545	2025-07-19	56	341	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
546	2025-07-21	56	262	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
547	2025-07-22	56	330	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
548	2025-07-23	56	157	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
549	2025-07-24	56	227	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
550	2025-07-25	56	297	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
551	2025-07-26	56	163	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
552	2025-07-28	56	221	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
553	2025-08-01	56	340	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
554	2025-08-02	56	159	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
555	2025-08-04	56	353	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
556	2025-08-05	56	249	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
557	2025-08-06	56	155	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
558	2025-08-07	56	258	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
559	2025-08-08	56	370	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
560	2025-08-09	56	246	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
561	2025-08-11	56	254	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
562	2025-08-12	56	209	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
563	2025-08-13	56	287	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
564	2025-08-14	56	310	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
565	2025-08-15	56	394	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
566	2025-08-16	56	348	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
567	2025-08-18	56	192	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
568	2025-08-19	56	227	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
569	2025-08-20	56	266	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
570	2025-08-21	56	342	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
571	2025-08-22	56	152	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
572	2025-08-23	56	233	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
573	2025-08-25	56	161	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
574	2025-08-26	56	325	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
575	2025-08-27	56	287	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
576	2025-08-28	56	321	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
577	2025-09-01	56	180	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
578	2025-09-02	56	306	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
579	2025-09-03	56	201	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
580	2025-09-04	56	217	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
581	2025-09-05	56	293	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
582	2025-09-06	56	287	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
583	2025-09-08	56	394	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
584	2025-09-09	56	177	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
585	2025-09-10	56	350	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
586	2025-09-11	56	355	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
587	2025-09-12	56	315	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
588	2025-09-13	56	388	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
589	2025-09-15	56	398	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
590	2025-09-16	56	325	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
591	2025-09-17	56	291	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
592	2025-09-18	56	379	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
593	2025-09-19	56	309	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
594	2025-09-20	56	249	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
595	2025-09-22	56	176	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
596	2025-09-23	56	336	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
597	2025-09-24	56	195	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
598	2025-09-25	56	323	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
599	2025-09-26	56	250	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
600	2025-09-27	56	179	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
601	2025-10-01	56	371	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
602	2025-10-02	56	155	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
603	2025-10-03	56	395	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
604	2025-10-04	56	363	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
605	2025-10-06	56	262	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
606	2025-10-07	56	155	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
607	2025-10-08	56	279	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
608	2025-10-09	56	227	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
609	2025-10-10	56	207	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
610	2025-10-11	56	303	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
611	2025-10-13	56	374	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
612	2025-10-14	56	388	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
613	2025-10-15	56	168	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
614	2025-10-16	56	288	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
615	2025-10-17	56	204	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
616	2025-10-18	56	363	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
617	2025-10-20	56	261	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
618	2025-10-21	56	216	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
619	2025-10-22	56	185	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
620	2025-10-23	56	304	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
621	2025-10-24	56	383	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
622	2025-10-25	56	201	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
623	2025-10-27	56	387	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
624	2025-10-28	56	328	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
625	2025-11-01	56	341	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
626	2025-11-03	56	392	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
627	2025-11-04	56	284	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
628	2025-11-05	56	319	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
629	2025-11-06	56	208	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
630	2025-11-07	56	182	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
631	2025-11-08	56	153	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
632	2025-11-10	56	286	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
633	2025-11-11	56	214	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
634	2025-11-12	56	218	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
635	2025-11-13	56	293	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
636	2025-11-14	56	246	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
637	2025-11-15	56	380	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
638	2025-11-17	56	310	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
639	2025-11-18	56	258	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
640	2025-11-19	56	264	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
641	2025-11-20	56	240	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
642	2025-11-21	56	260	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
643	2025-11-22	56	199	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
644	2025-11-24	56	251	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
645	2025-11-25	56	289	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
646	2025-11-26	56	262	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
647	2025-11-27	56	212	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
648	2025-11-28	56	369	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
649	2025-12-01	56	283	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
650	2025-12-02	56	235	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
651	2025-12-03	56	340	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
652	2025-12-04	56	188	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
653	2025-12-05	56	222	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
654	2025-12-06	56	166	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
655	2025-12-08	56	188	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
656	2025-12-09	56	151	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
657	2025-12-10	56	160	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
658	2025-12-11	56	389	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
659	2025-12-12	56	374	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
660	2025-12-13	56	179	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
661	2025-12-15	56	190	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
662	2025-12-16	56	226	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
663	2025-12-17	56	293	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
664	2025-12-18	56	327	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
665	2025-12-19	56	214	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
666	2025-12-20	56	172	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
667	2025-12-22	56	322	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
668	2025-12-23	56	289	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
669	2025-12-24	56	312	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
670	2025-12-25	56	305	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
671	2025-12-26	56	185	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
672	2025-12-27	56	328	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
673	2025-06-02	57	333	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
674	2025-06-03	57	297	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
675	2025-06-04	57	236	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
676	2025-06-05	57	236	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
677	2025-06-06	57	246	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
678	2025-06-07	57	318	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
679	2025-06-09	57	361	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
680	2025-06-10	57	188	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
681	2025-06-11	57	270	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
682	2025-06-12	57	156	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
683	2025-06-13	57	196	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
684	2025-06-14	57	253	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
685	2025-06-16	57	261	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
686	2025-06-17	57	246	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
687	2025-06-18	57	206	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
688	2025-06-19	57	196	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
689	2025-06-20	57	312	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
690	2025-06-21	57	368	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
691	2025-06-23	57	284	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
692	2025-06-24	57	240	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
693	2025-06-25	57	310	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
694	2025-06-26	57	247	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
695	2025-06-27	57	158	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
696	2025-06-28	57	220	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
697	2025-07-01	57	250	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
698	2025-07-02	57	283	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
699	2025-07-03	57	163	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
700	2025-07-04	57	189	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
701	2025-07-05	57	336	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
702	2025-07-07	57	294	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
703	2025-07-08	57	283	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
704	2025-07-09	57	265	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
705	2025-07-10	57	270	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
706	2025-07-11	57	306	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
707	2025-07-12	57	354	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
708	2025-07-14	57	343	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
709	2025-07-15	57	255	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
710	2025-07-16	57	330	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
711	2025-07-17	57	337	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
712	2025-07-18	57	389	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
713	2025-07-19	57	195	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
714	2025-07-21	57	368	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
715	2025-07-22	57	250	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
716	2025-07-23	57	214	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
717	2025-07-24	57	368	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
718	2025-07-25	57	246	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
719	2025-07-26	57	241	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
720	2025-07-28	57	288	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
721	2025-08-01	57	206	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
722	2025-08-02	57	304	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
723	2025-08-04	57	183	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
724	2025-08-05	57	303	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
725	2025-08-06	57	390	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
726	2025-08-07	57	378	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
727	2025-08-08	57	221	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
728	2025-08-09	57	392	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
729	2025-08-11	57	196	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
730	2025-08-12	57	228	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
731	2025-08-13	57	189	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
732	2025-08-14	57	196	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
733	2025-08-15	57	203	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
734	2025-08-16	57	254	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
735	2025-08-18	57	225	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
736	2025-08-19	57	198	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
737	2025-08-20	57	363	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
738	2025-08-21	57	203	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
739	2025-08-22	57	212	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
740	2025-08-23	57	223	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
741	2025-08-25	57	240	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
742	2025-08-26	57	183	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
743	2025-08-27	57	321	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
744	2025-08-28	57	267	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
745	2025-09-01	57	284	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
746	2025-09-02	57	195	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
747	2025-09-03	57	205	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
748	2025-09-04	57	288	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
749	2025-09-05	57	378	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
750	2025-09-06	57	357	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
751	2025-09-08	57	244	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
752	2025-09-09	57	278	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
753	2025-09-10	57	198	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
754	2025-09-11	57	248	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
755	2025-09-12	57	373	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
756	2025-09-13	57	240	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
757	2025-09-15	57	198	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
758	2025-09-16	57	343	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
759	2025-09-17	57	209	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
760	2025-09-18	57	182	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
761	2025-09-19	57	345	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
762	2025-09-20	57	260	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
763	2025-09-22	57	385	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
764	2025-09-23	57	356	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
765	2025-09-24	57	251	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
766	2025-09-25	57	288	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
767	2025-09-26	57	263	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
768	2025-09-27	57	274	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
769	2025-10-01	57	179	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
770	2025-10-02	57	279	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
771	2025-10-03	57	282	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
772	2025-10-04	57	319	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
773	2025-10-06	57	311	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
774	2025-10-07	57	328	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
775	2025-10-08	57	234	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
776	2025-10-09	57	260	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
777	2025-10-10	57	208	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
778	2025-10-11	57	342	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
779	2025-10-13	57	222	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
780	2025-10-14	57	213	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
781	2025-10-15	57	304	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
782	2025-10-16	57	194	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
783	2025-10-17	57	379	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
784	2025-10-18	57	321	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
785	2025-10-20	57	150	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
786	2025-10-21	57	185	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
787	2025-10-22	57	319	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
788	2025-10-23	57	239	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
789	2025-10-24	57	304	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
790	2025-10-25	57	239	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
791	2025-10-27	57	273	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
792	2025-10-28	57	203	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
793	2025-11-01	57	352	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
794	2025-11-03	57	223	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
795	2025-11-04	57	247	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
796	2025-11-05	57	187	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
797	2025-11-06	57	155	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
798	2025-11-07	57	384	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
799	2025-11-08	57	245	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
800	2025-11-10	57	208	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
801	2025-11-11	57	287	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
802	2025-11-12	57	308	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
803	2025-11-13	57	330	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
804	2025-11-14	57	311	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
805	2025-11-15	57	170	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
806	2025-11-17	57	151	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
807	2025-11-18	57	292	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
808	2025-11-19	57	346	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
809	2025-11-20	57	293	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
810	2025-11-21	57	353	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
811	2025-11-22	57	186	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
812	2025-11-24	57	231	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
813	2025-11-25	57	395	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
814	2025-11-26	57	174	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
815	2025-11-27	57	399	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
816	2025-11-28	57	224	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
817	2025-12-01	57	276	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
818	2025-12-02	57	295	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
819	2025-12-03	57	151	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
820	2025-12-04	57	249	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
821	2025-12-05	57	281	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
822	2025-12-06	57	252	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
823	2025-12-08	57	193	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
824	2025-12-09	57	151	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
825	2025-12-10	57	398	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
826	2025-12-11	57	320	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
827	2025-12-12	57	172	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
828	2025-12-13	57	370	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
829	2025-12-15	57	184	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
830	2025-12-16	57	174	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
831	2025-12-17	57	343	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
832	2025-12-18	57	186	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
833	2025-12-19	57	357	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
834	2025-12-20	57	242	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
835	2025-12-22	57	355	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
836	2025-12-23	57	308	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
837	2025-12-24	57	385	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
838	2025-12-25	57	330	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
839	2025-12-26	57	324	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
840	2025-12-27	57	170	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
841	2025-06-02	58	295	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
842	2025-06-03	58	277	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
843	2025-06-04	58	159	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
844	2025-06-05	58	287	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
845	2025-06-06	58	296	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
846	2025-06-07	58	253	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
847	2025-06-09	58	201	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
848	2025-06-10	58	300	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
849	2025-06-11	58	281	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
850	2025-06-12	58	335	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
851	2025-06-13	58	281	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
852	2025-06-14	58	206	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
853	2025-06-16	58	320	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
854	2025-06-17	58	243	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
855	2025-06-18	58	251	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
856	2025-06-19	58	372	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
857	2025-06-20	58	235	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
858	2025-06-21	58	176	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
859	2025-06-23	58	296	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
860	2025-06-24	58	333	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
861	2025-06-25	58	172	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
862	2025-06-26	58	219	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
863	2025-06-27	58	222	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
864	2025-06-28	58	166	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
865	2025-07-01	58	398	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
866	2025-07-02	58	315	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
867	2025-07-03	58	385	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
868	2025-07-04	58	307	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
869	2025-07-05	58	395	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
870	2025-07-07	58	156	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
871	2025-07-08	58	189	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
872	2025-07-09	58	175	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
873	2025-07-10	58	308	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
874	2025-07-11	58	301	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
875	2025-07-12	58	278	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
876	2025-07-14	58	299	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
877	2025-07-15	58	157	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
878	2025-07-16	58	178	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
879	2025-07-17	58	322	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
880	2025-07-18	58	277	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
881	2025-07-19	58	372	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
882	2025-07-21	58	283	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
883	2025-07-22	58	228	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
884	2025-07-23	58	264	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
885	2025-07-24	58	239	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
886	2025-07-25	58	294	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
887	2025-07-26	58	284	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
888	2025-07-28	58	370	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
889	2025-08-01	58	369	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
890	2025-08-02	58	366	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
891	2025-08-04	58	247	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
892	2025-08-05	58	343	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
893	2025-08-06	58	360	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
894	2025-08-07	58	153	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
895	2025-08-08	58	177	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
896	2025-08-09	58	266	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
897	2025-08-11	58	323	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
898	2025-08-12	58	375	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
899	2025-08-13	58	197	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
900	2025-08-14	58	376	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
901	2025-08-15	58	362	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
902	2025-08-16	58	375	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
903	2025-08-18	58	287	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
904	2025-08-19	58	329	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
905	2025-08-20	58	388	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
906	2025-08-21	58	312	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
907	2025-08-22	58	229	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
908	2025-08-23	58	307	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
909	2025-08-25	58	193	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
910	2025-08-26	58	296	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
911	2025-08-27	58	377	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
912	2025-08-28	58	293	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
913	2025-09-01	58	203	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
914	2025-09-02	58	254	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
915	2025-09-03	58	331	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
916	2025-09-04	58	355	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
917	2025-09-05	58	398	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
918	2025-09-06	58	246	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
919	2025-09-08	58	354	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
920	2025-09-09	58	166	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
921	2025-09-10	58	225	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
922	2025-09-11	58	194	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
923	2025-09-12	58	242	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
924	2025-09-13	58	291	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
925	2025-09-15	58	278	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
926	2025-09-16	58	276	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
927	2025-09-17	58	336	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
928	2025-09-18	58	331	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
929	2025-09-19	58	295	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
930	2025-09-20	58	163	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
931	2025-09-22	58	329	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
932	2025-09-23	58	260	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
933	2025-09-24	58	396	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
934	2025-09-25	58	231	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
935	2025-09-26	58	371	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
936	2025-09-27	58	268	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
937	2025-10-01	58	219	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
938	2025-10-02	58	254	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
939	2025-10-03	58	211	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
940	2025-10-04	58	386	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
941	2025-10-06	58	229	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
942	2025-10-07	58	261	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
943	2025-10-08	58	274	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
944	2025-10-09	58	278	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
945	2025-10-10	58	242	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
946	2025-10-11	58	274	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
947	2025-10-13	58	233	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
948	2025-10-14	58	325	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
949	2025-10-15	58	183	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
950	2025-10-16	58	164	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
951	2025-10-17	58	151	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
952	2025-10-18	58	177	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
953	2025-10-20	58	353	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
954	2025-10-21	58	376	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
955	2025-10-22	58	273	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
956	2025-10-23	58	337	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
957	2025-10-24	58	186	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
958	2025-10-25	58	158	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
959	2025-10-27	58	363	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
960	2025-10-28	58	159	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
961	2025-11-01	58	277	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
962	2025-11-03	58	181	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
963	2025-11-04	58	180	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
964	2025-11-05	58	356	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
965	2025-11-06	58	370	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
966	2025-11-07	58	219	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
967	2025-11-08	58	222	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
968	2025-11-10	58	198	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
969	2025-11-11	58	167	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
970	2025-11-12	58	243	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
971	2025-11-13	58	202	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
972	2025-11-14	58	192	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
973	2025-11-15	58	328	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
974	2025-11-17	58	181	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
975	2025-11-18	58	311	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
976	2025-11-19	58	246	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
977	2025-11-20	58	335	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
978	2025-11-21	58	232	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
979	2025-11-22	58	171	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
980	2025-11-24	58	301	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
981	2025-11-25	58	391	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
982	2025-11-26	58	260	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
983	2025-11-27	58	218	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
984	2025-11-28	58	152	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
985	2025-12-01	58	180	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
986	2025-12-02	58	348	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
987	2025-12-03	58	265	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
988	2025-12-04	58	189	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
989	2025-12-05	58	282	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
990	2025-12-06	58	198	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
991	2025-12-08	58	272	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
992	2025-12-09	58	181	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
993	2025-12-10	58	152	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
994	2025-12-11	58	187	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
995	2025-12-12	58	152	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
996	2025-12-13	58	244	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
997	2025-12-15	58	177	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
998	2025-12-16	58	352	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
999	2025-12-17	58	180	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1000	2025-12-18	58	165	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1001	2025-12-19	58	363	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1002	2025-12-20	58	186	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1003	2025-12-22	58	256	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1004	2025-12-23	58	378	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1005	2025-12-24	58	193	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1006	2025-12-25	58	301	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1007	2025-12-26	58	160	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1008	2025-12-27	58	318	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1009	2025-06-02	59	232	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1010	2025-06-03	59	209	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1011	2025-06-04	59	213	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1012	2025-06-05	59	230	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1013	2025-06-06	59	331	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1014	2025-06-07	59	163	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1015	2025-06-09	59	310	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1016	2025-06-10	59	254	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1017	2025-06-11	59	183	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1018	2025-06-12	59	291	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1019	2025-06-13	59	213	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1020	2025-06-14	59	351	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1021	2025-06-16	59	352	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1022	2025-06-17	59	329	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1023	2025-06-18	59	366	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1024	2025-06-19	59	251	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1025	2025-06-20	59	172	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1026	2025-06-21	59	171	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1027	2025-06-23	59	314	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1028	2025-06-24	59	246	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1029	2025-06-25	59	358	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1030	2025-06-26	59	151	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1031	2025-06-27	59	380	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1032	2025-06-28	59	268	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1033	2025-07-01	59	338	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1034	2025-07-02	59	204	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1035	2025-07-03	59	350	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1036	2025-07-04	59	359	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1037	2025-07-05	59	266	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1038	2025-07-07	59	213	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1039	2025-07-08	59	194	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1040	2025-07-09	59	191	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1041	2025-07-10	59	166	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1042	2025-07-11	59	398	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1043	2025-07-12	59	289	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1044	2025-07-14	59	297	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1045	2025-07-15	59	346	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1046	2025-07-16	59	388	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1047	2025-07-17	59	228	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1048	2025-07-18	59	310	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1049	2025-07-19	59	168	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1050	2025-07-21	59	243	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1051	2025-07-22	59	231	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1052	2025-07-23	59	388	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1053	2025-07-24	59	330	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1054	2025-07-25	59	226	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1055	2025-07-26	59	222	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1056	2025-07-28	59	323	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1057	2025-08-01	59	183	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1058	2025-08-02	59	272	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1059	2025-08-04	59	202	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1060	2025-08-05	59	254	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1061	2025-08-06	59	233	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1062	2025-08-07	59	263	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1063	2025-08-08	59	213	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1064	2025-08-09	59	235	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1065	2025-08-11	59	205	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1066	2025-08-12	59	352	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1067	2025-08-13	59	225	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1068	2025-08-14	59	303	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1069	2025-08-15	59	278	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1070	2025-08-16	59	216	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1071	2025-08-18	59	284	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1072	2025-08-19	59	172	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1073	2025-08-20	59	386	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1074	2025-08-21	59	333	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1075	2025-08-22	59	151	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1076	2025-08-23	59	195	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1077	2025-08-25	59	394	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1078	2025-08-26	59	287	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1079	2025-08-27	59	261	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1080	2025-08-28	59	234	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1081	2025-09-01	59	226	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1082	2025-09-02	59	303	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1083	2025-09-03	59	295	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1084	2025-09-04	59	266	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1085	2025-09-05	59	170	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1086	2025-09-06	59	150	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1087	2025-09-08	59	199	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1088	2025-09-09	59	264	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1089	2025-09-10	59	270	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1090	2025-09-11	59	312	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1091	2025-09-12	59	272	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1092	2025-09-13	59	355	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1093	2025-09-15	59	317	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1094	2025-09-16	59	374	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1095	2025-09-17	59	354	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1096	2025-09-18	59	271	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1097	2025-09-19	59	356	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1098	2025-09-20	59	278	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1099	2025-09-22	59	281	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1100	2025-09-23	59	314	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1101	2025-09-24	59	168	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1102	2025-09-25	59	285	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1103	2025-09-26	59	387	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1104	2025-09-27	59	194	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1105	2025-10-01	59	328	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1106	2025-10-02	59	275	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1107	2025-10-03	59	283	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1108	2025-10-04	59	318	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1109	2025-10-06	59	296	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1110	2025-10-07	59	182	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1111	2025-10-08	59	217	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1112	2025-10-09	59	364	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1113	2025-10-10	59	366	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1114	2025-10-11	59	177	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1115	2025-10-13	59	326	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1116	2025-10-14	59	312	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1117	2025-10-15	59	307	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1118	2025-10-16	59	199	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1119	2025-10-17	59	280	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1120	2025-10-18	59	257	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1121	2025-10-20	59	331	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1122	2025-10-21	59	190	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1123	2025-10-22	59	343	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1124	2025-10-23	59	307	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1125	2025-10-24	59	335	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1126	2025-10-25	59	247	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1127	2025-10-27	59	261	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1128	2025-10-28	59	280	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1129	2025-11-01	59	215	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1130	2025-11-03	59	364	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1131	2025-11-04	59	189	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1132	2025-11-05	59	199	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1133	2025-11-06	59	231	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1134	2025-11-07	59	303	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1135	2025-11-08	59	157	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1136	2025-11-10	59	181	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1137	2025-11-11	59	376	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1138	2025-11-12	59	262	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1139	2025-11-13	59	169	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1140	2025-11-14	59	366	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1141	2025-11-15	59	265	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1142	2025-11-17	59	157	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1143	2025-11-18	59	392	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1144	2025-11-19	59	314	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1145	2025-11-20	59	289	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1146	2025-11-21	59	328	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1147	2025-11-22	59	283	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1148	2025-11-24	59	198	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1149	2025-11-25	59	224	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1150	2025-11-26	59	366	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1151	2025-11-27	59	173	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1152	2025-11-28	59	334	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1153	2025-12-01	59	235	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1154	2025-12-02	59	238	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1155	2025-12-03	59	323	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1156	2025-12-04	59	292	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1157	2025-12-05	59	199	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1158	2025-12-06	59	197	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1159	2025-12-08	59	227	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1160	2025-12-09	59	249	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1161	2025-12-10	59	179	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1162	2025-12-11	59	340	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1163	2025-12-12	59	269	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1164	2025-12-13	59	241	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1165	2025-12-15	59	213	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1166	2025-12-16	59	287	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1167	2025-12-17	59	218	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1168	2025-12-18	59	394	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1169	2025-12-19	59	367	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1170	2025-12-20	59	331	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1171	2025-12-22	59	301	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1172	2025-12-23	59	217	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1173	2025-12-24	59	216	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1174	2025-12-25	59	274	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1175	2025-12-26	59	243	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1176	2025-12-27	59	354	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1177	2025-06-02	60	204	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1178	2025-06-03	60	397	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1179	2025-06-04	60	355	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1180	2025-06-05	60	187	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1181	2025-06-06	60	202	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1182	2025-06-07	60	155	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1183	2025-06-09	60	210	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1184	2025-06-10	60	254	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1185	2025-06-11	60	276	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1186	2025-06-12	60	354	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1187	2025-06-13	60	387	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1188	2025-06-14	60	263	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1189	2025-06-16	60	338	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1190	2025-06-17	60	389	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1191	2025-06-18	60	397	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1192	2025-06-19	60	161	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1193	2025-06-20	60	354	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1194	2025-06-21	60	384	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1195	2025-06-23	60	225	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1196	2025-06-24	60	354	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1197	2025-06-25	60	340	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1198	2025-06-26	60	347	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1199	2025-06-27	60	371	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1200	2025-06-28	60	206	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1201	2025-07-01	60	152	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1202	2025-07-02	60	266	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1203	2025-07-03	60	184	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1204	2025-07-04	60	216	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1205	2025-07-05	60	162	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1206	2025-07-07	60	297	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1207	2025-07-08	60	244	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1208	2025-07-09	60	192	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1209	2025-07-10	60	161	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1210	2025-07-11	60	157	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1211	2025-07-12	60	332	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1212	2025-07-14	60	357	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1213	2025-07-15	60	269	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1214	2025-07-16	60	301	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1215	2025-07-17	60	170	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1216	2025-07-18	60	354	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1217	2025-07-19	60	319	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1218	2025-07-21	60	238	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1219	2025-07-22	60	348	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1220	2025-07-23	60	232	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1221	2025-07-24	60	158	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1222	2025-07-25	60	168	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1223	2025-07-26	60	306	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1224	2025-07-28	60	342	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1225	2025-08-01	60	397	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1226	2025-08-02	60	283	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1227	2025-08-04	60	191	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1228	2025-08-05	60	351	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1229	2025-08-06	60	201	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1230	2025-08-07	60	152	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1231	2025-08-08	60	238	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1232	2025-08-09	60	207	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1233	2025-08-11	60	165	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1234	2025-08-12	60	295	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1235	2025-08-13	60	209	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1236	2025-08-14	60	268	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1237	2025-08-15	60	154	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1238	2025-08-16	60	213	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1239	2025-08-18	60	359	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1240	2025-08-19	60	172	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1241	2025-08-20	60	396	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1242	2025-08-21	60	197	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1243	2025-08-22	60	388	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1244	2025-08-23	60	224	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1245	2025-08-25	60	334	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1246	2025-08-26	60	263	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1247	2025-08-27	60	302	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1248	2025-08-28	60	362	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1249	2025-09-01	60	222	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1250	2025-09-02	60	225	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1251	2025-09-03	60	165	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1252	2025-09-04	60	223	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1253	2025-09-05	60	218	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1254	2025-09-06	60	344	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1255	2025-09-08	60	219	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1256	2025-09-09	60	183	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1257	2025-09-10	60	374	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1258	2025-09-11	60	212	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1259	2025-09-12	60	224	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1260	2025-09-13	60	184	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1261	2025-09-15	60	251	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1262	2025-09-16	60	307	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1263	2025-09-17	60	390	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1264	2025-09-18	60	204	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1265	2025-09-19	60	296	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1266	2025-09-20	60	227	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1267	2025-09-22	60	353	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1268	2025-09-23	60	282	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1269	2025-09-24	60	172	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1270	2025-09-25	60	357	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1271	2025-09-26	60	276	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1272	2025-09-27	60	367	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1273	2025-10-01	60	338	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1274	2025-10-02	60	341	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1275	2025-10-03	60	366	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1276	2025-10-04	60	254	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1277	2025-10-06	60	345	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1278	2025-10-07	60	395	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1279	2025-10-08	60	190	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1280	2025-10-09	60	250	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1281	2025-10-10	60	381	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1282	2025-10-11	60	300	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1283	2025-10-13	60	184	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1284	2025-10-14	60	195	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1285	2025-10-15	60	185	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1286	2025-10-16	60	391	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1287	2025-10-17	60	330	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1288	2025-10-18	60	324	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1289	2025-10-20	60	348	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1290	2025-10-21	60	340	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1291	2025-10-22	60	297	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1292	2025-10-23	60	172	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1293	2025-10-24	60	208	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1294	2025-10-25	60	175	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1295	2025-10-27	60	211	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1296	2025-10-28	60	268	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1297	2025-11-01	60	233	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1298	2025-11-03	60	214	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1299	2025-11-04	60	152	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1300	2025-11-05	60	300	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1301	2025-11-06	60	338	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1302	2025-11-07	60	324	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1303	2025-11-08	60	387	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1304	2025-11-10	60	394	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1305	2025-11-11	60	158	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1306	2025-11-12	60	245	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1307	2025-11-13	60	286	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1308	2025-11-14	60	226	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1309	2025-11-15	60	263	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1310	2025-11-17	60	219	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1311	2025-11-18	60	276	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1312	2025-11-19	60	164	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1313	2025-11-20	60	380	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1314	2025-11-21	60	292	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1315	2025-11-22	60	280	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1316	2025-11-24	60	317	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1317	2025-11-25	60	365	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1318	2025-11-26	60	225	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1319	2025-11-27	60	255	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1320	2025-11-28	60	245	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1321	2025-12-01	60	227	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1322	2025-12-02	60	344	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1323	2025-12-03	60	358	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1324	2025-12-04	60	168	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1325	2025-12-05	60	386	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1326	2025-12-06	60	169	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1327	2025-12-08	60	224	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1328	2025-12-09	60	319	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1329	2025-12-10	60	327	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1330	2025-12-11	60	344	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1331	2025-12-12	60	176	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1332	2025-12-13	60	292	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1333	2025-12-15	60	291	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1334	2025-12-16	60	323	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1335	2025-12-17	60	302	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1336	2025-12-18	60	295	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1337	2025-12-19	60	284	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1338	2025-12-20	60	338	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1339	2025-12-22	60	243	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1340	2025-12-23	60	151	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1341	2025-12-24	60	270	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1342	2025-12-25	60	247	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1343	2025-12-26	60	304	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1344	2025-12-27	60	294	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1345	2025-06-02	63	268	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1346	2025-06-03	63	217	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1347	2025-06-04	63	250	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1348	2025-06-05	63	336	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1349	2025-06-06	63	256	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1350	2025-06-07	63	357	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1351	2025-06-09	63	373	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1352	2025-06-10	63	376	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1353	2025-06-11	63	327	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1354	2025-06-12	63	383	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1355	2025-06-13	63	168	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1356	2025-06-14	63	318	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1357	2025-06-16	63	267	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1358	2025-06-17	63	291	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1359	2025-06-18	63	235	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1360	2025-06-19	63	270	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1361	2025-06-20	63	170	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1362	2025-06-21	63	319	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1363	2025-06-23	63	191	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1364	2025-06-24	63	161	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1365	2025-06-25	63	217	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1366	2025-06-26	63	297	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1367	2025-06-27	63	333	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1368	2025-06-28	63	333	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1369	2025-07-01	63	374	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1370	2025-07-02	63	182	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1371	2025-07-03	63	331	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1372	2025-07-04	63	388	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1373	2025-07-05	63	219	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1374	2025-07-07	63	178	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1375	2025-07-08	63	318	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1376	2025-07-09	63	206	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1377	2025-07-10	63	177	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1378	2025-07-11	63	348	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1379	2025-07-12	63	193	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1380	2025-07-14	63	289	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1381	2025-07-15	63	322	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1382	2025-07-16	63	315	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1383	2025-07-17	63	228	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1384	2025-07-18	63	369	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1385	2025-07-19	63	153	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1386	2025-07-21	63	305	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1387	2025-07-22	63	270	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1388	2025-07-23	63	246	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1389	2025-07-24	63	275	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1390	2025-07-25	63	240	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1391	2025-07-26	63	346	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1392	2025-07-28	63	363	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1393	2025-08-01	63	195	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1394	2025-08-02	63	351	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1395	2025-08-04	63	334	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1396	2025-08-05	63	387	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1397	2025-08-06	63	350	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1398	2025-08-07	63	276	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1399	2025-08-08	63	262	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1400	2025-08-09	63	197	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1401	2025-08-11	63	381	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1402	2025-08-12	63	152	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1403	2025-08-13	63	278	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1404	2025-08-14	63	291	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1405	2025-08-15	63	209	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1406	2025-08-16	63	176	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1407	2025-08-18	63	379	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1408	2025-08-19	63	312	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1409	2025-08-20	63	350	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1410	2025-08-21	63	284	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1411	2025-08-22	63	208	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1412	2025-08-23	63	183	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1413	2025-08-25	63	215	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1414	2025-08-26	63	225	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1415	2025-08-27	63	278	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1416	2025-08-28	63	351	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1417	2025-09-01	63	301	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1418	2025-09-02	63	216	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1419	2025-09-03	63	286	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1420	2025-09-04	63	321	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1421	2025-09-05	63	229	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1422	2025-09-06	63	385	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1423	2025-09-08	63	261	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1424	2025-09-09	63	190	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1425	2025-09-10	63	237	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1426	2025-09-11	63	336	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1427	2025-09-12	63	229	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1428	2025-09-13	63	355	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1429	2025-09-15	63	339	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1430	2025-09-16	63	217	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1431	2025-09-17	63	321	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1432	2025-09-18	63	219	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1433	2025-09-19	63	356	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1434	2025-09-20	63	228	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1435	2025-09-22	63	225	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1436	2025-09-23	63	153	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1437	2025-09-24	63	214	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1438	2025-09-25	63	218	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1439	2025-09-26	63	233	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1440	2025-09-27	63	318	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1441	2025-10-01	63	317	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1442	2025-10-02	63	367	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1443	2025-10-03	63	271	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1444	2025-10-04	63	382	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1445	2025-10-06	63	255	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1446	2025-10-07	63	232	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1447	2025-10-08	63	331	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1448	2025-10-09	63	212	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1449	2025-10-10	63	351	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1450	2025-10-11	63	293	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1451	2025-10-13	63	211	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1452	2025-10-14	63	176	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1453	2025-10-15	63	268	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1454	2025-10-16	63	345	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1455	2025-10-17	63	200	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1456	2025-10-18	63	159	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1457	2025-10-20	63	196	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1458	2025-10-21	63	319	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1459	2025-10-22	63	359	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1460	2025-10-23	63	311	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1461	2025-10-24	63	192	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1462	2025-10-25	63	238	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1463	2025-10-27	63	240	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1464	2025-10-28	63	287	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1465	2025-11-01	63	360	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1466	2025-11-03	63	164	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1467	2025-11-04	63	332	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1468	2025-11-05	63	238	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1469	2025-11-06	63	377	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1470	2025-11-07	63	245	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1471	2025-11-08	63	268	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1472	2025-11-10	63	374	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1473	2025-11-11	63	307	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1474	2025-11-12	63	236	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1475	2025-11-13	63	189	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1476	2025-11-14	63	306	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1477	2025-11-15	63	267	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1478	2025-11-17	63	298	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1479	2025-11-18	63	198	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1480	2025-11-19	63	224	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1481	2025-11-20	63	204	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1482	2025-11-21	63	263	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1483	2025-11-22	63	200	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1484	2025-11-24	63	249	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1485	2025-11-25	63	275	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1486	2025-11-26	63	281	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1487	2025-11-27	63	280	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1488	2025-11-28	63	334	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1489	2025-12-01	63	294	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1490	2025-12-02	63	229	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1491	2025-12-03	63	159	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1492	2025-12-04	63	290	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1493	2025-12-05	63	229	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1494	2025-12-06	63	364	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1495	2025-12-08	63	374	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1496	2025-12-09	63	381	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1497	2025-12-10	63	325	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1498	2025-12-11	63	174	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1499	2025-12-12	63	155	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1500	2025-12-13	63	340	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1501	2025-12-15	63	342	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1502	2025-12-16	63	300	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1503	2025-12-17	63	231	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1504	2025-12-18	63	392	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1505	2025-12-19	63	397	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1506	2025-12-20	63	309	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1507	2025-12-22	63	169	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1508	2025-12-23	63	320	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1509	2025-12-24	63	257	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1510	2025-12-25	63	284	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1511	2025-12-26	63	169	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1512	2025-12-27	63	212	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1513	2025-06-02	64	192	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1514	2025-06-03	64	248	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1515	2025-06-04	64	328	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1516	2025-06-05	64	267	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1517	2025-06-06	64	326	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1518	2025-06-07	64	157	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1519	2025-06-09	64	175	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1520	2025-06-10	64	397	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1521	2025-06-11	64	350	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1522	2025-06-12	64	318	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1523	2025-06-13	64	264	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1524	2025-06-14	64	191	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1525	2025-06-16	64	231	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1526	2025-06-17	64	197	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1527	2025-06-18	64	372	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1528	2025-06-19	64	324	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1529	2025-06-20	64	284	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1530	2025-06-21	64	310	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1531	2025-06-23	64	237	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1532	2025-06-24	64	252	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1533	2025-06-25	64	313	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1534	2025-06-26	64	281	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1535	2025-06-27	64	221	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1536	2025-06-28	64	262	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1537	2025-07-01	64	256	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1538	2025-07-02	64	317	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1539	2025-07-03	64	356	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1540	2025-07-04	64	252	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1541	2025-07-05	64	278	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1542	2025-07-07	64	255	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1543	2025-07-08	64	164	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1544	2025-07-09	64	214	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1545	2025-07-10	64	298	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1546	2025-07-11	64	195	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1547	2025-07-12	64	308	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1548	2025-07-14	64	219	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1549	2025-07-15	64	315	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1550	2025-07-16	64	253	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1551	2025-07-17	64	377	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1552	2025-07-18	64	286	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1553	2025-07-19	64	346	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1554	2025-07-21	64	317	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1555	2025-07-22	64	167	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1556	2025-07-23	64	216	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1557	2025-07-24	64	394	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1558	2025-07-25	64	380	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1559	2025-07-26	64	194	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1560	2025-07-28	64	389	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1561	2025-08-01	64	200	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1562	2025-08-02	64	301	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1563	2025-08-04	64	241	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1564	2025-08-05	64	228	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1565	2025-08-06	64	214	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1566	2025-08-07	64	276	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1567	2025-08-08	64	257	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1568	2025-08-09	64	239	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1569	2025-08-11	64	258	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1570	2025-08-12	64	381	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1571	2025-08-13	64	270	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1572	2025-08-14	64	176	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1573	2025-08-15	64	207	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1574	2025-08-16	64	154	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1575	2025-08-18	64	277	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1576	2025-08-19	64	264	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1577	2025-08-20	64	232	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1578	2025-08-21	64	326	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1579	2025-08-22	64	390	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1580	2025-08-23	64	319	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1581	2025-08-25	64	303	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1582	2025-08-26	64	300	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1583	2025-08-27	64	335	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1584	2025-08-28	64	313	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1585	2025-09-01	64	171	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1586	2025-09-02	64	166	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1587	2025-09-03	64	297	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1588	2025-09-04	64	253	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1589	2025-09-05	64	306	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1590	2025-09-06	64	259	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1591	2025-09-08	64	166	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1592	2025-09-09	64	150	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1593	2025-09-10	64	369	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1594	2025-09-11	64	308	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1595	2025-09-12	64	196	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1596	2025-09-13	64	202	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1597	2025-09-15	64	397	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1598	2025-09-16	64	252	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1599	2025-09-17	64	260	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1600	2025-09-18	64	203	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1601	2025-09-19	64	350	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1602	2025-09-20	64	372	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1603	2025-09-22	64	160	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1604	2025-09-23	64	369	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1605	2025-09-24	64	396	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1606	2025-09-25	64	365	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1607	2025-09-26	64	394	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1608	2025-09-27	64	200	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1609	2025-10-01	64	154	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1610	2025-10-02	64	351	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1611	2025-10-03	64	170	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1612	2025-10-04	64	158	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1613	2025-10-06	64	295	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1614	2025-10-07	64	383	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1615	2025-10-08	64	278	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1616	2025-10-09	64	203	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1617	2025-10-10	64	384	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1618	2025-10-11	64	168	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1619	2025-10-13	64	371	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1620	2025-10-14	64	276	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1621	2025-10-15	64	343	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1622	2025-10-16	64	214	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1623	2025-10-17	64	220	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1624	2025-10-18	64	166	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1625	2025-10-20	64	227	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1626	2025-10-21	64	249	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1627	2025-10-22	64	248	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1628	2025-10-23	64	248	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1629	2025-10-24	64	229	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1630	2025-10-25	64	180	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1631	2025-10-27	64	323	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1632	2025-10-28	64	376	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1633	2025-11-01	64	191	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1634	2025-11-03	64	370	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1635	2025-11-04	64	281	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1636	2025-11-05	64	163	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1637	2025-11-06	64	384	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1638	2025-11-07	64	170	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1639	2025-11-08	64	269	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1640	2025-11-10	64	314	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1641	2025-11-11	64	178	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1642	2025-11-12	64	166	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1643	2025-11-13	64	214	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1644	2025-11-14	64	151	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1645	2025-11-15	64	375	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1646	2025-11-17	64	166	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1647	2025-11-18	64	364	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1648	2025-11-19	64	206	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1649	2025-11-20	64	307	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1650	2025-11-21	64	211	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1651	2025-11-22	64	256	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1652	2025-11-24	64	226	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1653	2025-11-25	64	380	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1654	2025-11-26	64	378	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1655	2025-11-27	64	271	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1656	2025-11-28	64	173	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1657	2025-12-01	64	244	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1658	2025-12-02	64	251	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1659	2025-12-03	64	297	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1660	2025-12-04	64	273	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1661	2025-12-05	64	270	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1662	2025-12-06	64	328	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1663	2025-12-08	64	333	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1664	2025-12-09	64	263	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1665	2025-12-10	64	252	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1666	2025-12-11	64	211	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1667	2025-12-12	64	239	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1668	2025-12-13	64	309	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1669	2025-12-15	64	359	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1670	2025-12-16	64	242	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1671	2025-12-17	64	206	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1672	2025-12-18	64	186	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1673	2025-12-19	64	257	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1674	2025-12-20	64	237	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1675	2025-12-22	64	203	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1676	2025-12-23	64	267	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1677	2025-12-24	64	199	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1678	2025-12-25	64	316	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1679	2025-12-26	64	216	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1680	2025-12-27	64	388	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1681	2025-06-02	75	367	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1682	2025-06-03	75	339	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1683	2025-06-04	75	255	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1684	2025-06-05	75	201	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1685	2025-06-06	75	381	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1686	2025-06-07	75	305	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1687	2025-06-09	75	171	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1688	2025-06-10	75	239	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1689	2025-06-11	75	153	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1690	2025-06-12	75	208	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1691	2025-06-13	75	220	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1692	2025-06-14	75	295	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1693	2025-06-16	75	388	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1694	2025-06-17	75	283	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1695	2025-06-18	75	163	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1696	2025-06-19	75	386	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1697	2025-06-20	75	298	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1698	2025-06-21	75	252	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1699	2025-06-23	75	171	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1700	2025-06-24	75	340	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1701	2025-06-25	75	165	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1702	2025-06-26	75	231	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1703	2025-06-27	75	215	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1704	2025-06-28	75	167	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1705	2025-07-01	75	197	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1706	2025-07-02	75	317	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1707	2025-07-03	75	280	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1708	2025-07-04	75	296	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1709	2025-07-05	75	217	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1710	2025-07-07	75	163	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1711	2025-07-08	75	183	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1712	2025-07-09	75	194	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1713	2025-07-10	75	332	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1714	2025-07-11	75	266	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1715	2025-07-12	75	237	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1716	2025-07-14	75	239	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1717	2025-07-15	75	316	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1718	2025-07-16	75	189	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1719	2025-07-17	75	398	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1720	2025-07-18	75	178	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1721	2025-07-19	75	314	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1722	2025-07-21	75	220	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1723	2025-07-22	75	203	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1724	2025-07-23	75	192	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1725	2025-07-24	75	175	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1726	2025-07-25	75	177	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1727	2025-07-26	75	361	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1728	2025-07-28	75	269	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1729	2025-08-01	75	311	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1730	2025-08-02	75	152	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1731	2025-08-04	75	308	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1732	2025-08-05	75	339	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1733	2025-08-06	75	363	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1734	2025-08-07	75	251	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1735	2025-08-08	75	212	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1736	2025-08-09	75	277	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1737	2025-08-11	75	358	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1738	2025-08-12	75	183	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1739	2025-08-13	75	266	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1740	2025-08-14	75	394	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1741	2025-08-15	75	302	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1742	2025-08-16	75	355	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1743	2025-08-18	75	387	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1744	2025-08-19	75	314	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1745	2025-08-20	75	351	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1746	2025-08-21	75	194	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1747	2025-08-22	75	284	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1748	2025-08-23	75	357	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1749	2025-08-25	75	285	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1750	2025-08-26	75	264	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1751	2025-08-27	75	283	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1752	2025-08-28	75	276	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1753	2025-09-01	75	257	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1754	2025-09-02	75	246	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1755	2025-09-03	75	270	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1756	2025-09-04	75	283	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1757	2025-09-05	75	231	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1758	2025-09-06	75	252	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1759	2025-09-08	75	280	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1760	2025-09-09	75	290	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1761	2025-09-10	75	271	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1762	2025-09-11	75	253	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1763	2025-09-12	75	399	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1764	2025-09-13	75	312	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1765	2025-09-15	75	216	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1766	2025-09-16	75	317	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1767	2025-09-17	75	213	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1768	2025-09-18	75	275	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1769	2025-09-19	75	185	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1770	2025-09-20	75	246	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1771	2025-09-22	75	381	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1772	2025-09-23	75	386	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1773	2025-09-24	75	207	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1774	2025-09-25	75	325	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1775	2025-09-26	75	312	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1776	2025-09-27	75	309	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1777	2025-10-01	75	205	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1778	2025-10-02	75	363	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1779	2025-10-03	75	158	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1780	2025-10-04	75	279	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1781	2025-10-06	75	298	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1782	2025-10-07	75	220	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1783	2025-10-08	75	235	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1784	2025-10-09	75	338	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1785	2025-10-10	75	161	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1786	2025-10-11	75	340	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1787	2025-10-13	75	317	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1788	2025-10-14	75	351	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1789	2025-10-15	75	288	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1790	2025-10-16	75	349	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1791	2025-10-17	75	159	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1792	2025-10-18	75	155	4	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1793	2025-10-20	75	156	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1794	2025-10-21	75	226	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1795	2025-10-22	75	317	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1796	2025-10-23	75	239	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1797	2025-10-24	75	325	10	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1798	2025-10-25	75	229	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1799	2025-10-27	75	369	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1800	2025-10-28	75	383	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1801	2025-11-01	75	178	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1802	2025-11-03	75	363	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1803	2025-11-04	75	160	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1804	2025-11-05	75	195	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1805	2025-11-06	75	248	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1806	2025-11-07	75	159	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1807	2025-11-08	75	211	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1808	2025-11-10	75	358	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1809	2025-11-11	75	183	6	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1810	2025-11-12	75	384	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1811	2025-11-13	75	177	7	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1812	2025-11-14	75	380	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1813	2025-11-15	75	167	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1814	2025-11-17	75	215	15	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1815	2025-11-18	75	370	3	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1816	2025-11-19	75	354	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1817	2025-11-20	75	355	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1818	2025-11-21	75	214	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1819	2025-11-22	75	190	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1820	2025-11-24	75	268	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1821	2025-11-25	75	206	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1822	2025-11-26	75	278	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1823	2025-11-27	75	340	16	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1824	2025-11-28	75	387	11	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1825	2025-12-01	75	314	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1826	2025-12-02	75	151	8	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1827	2025-12-03	75	308	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1828	2025-12-04	75	195	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1829	2025-12-05	75	189	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1830	2025-12-06	75	384	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1831	2025-12-08	75	189	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1832	2025-12-09	75	188	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1833	2025-12-10	75	203	0	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1834	2025-12-11	75	286	18	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1835	2025-12-12	75	281	14	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1836	2025-12-13	75	267	17	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1837	2025-12-15	75	355	9	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1838	2025-12-16	75	362	1	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1839	2025-12-17	75	284	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1840	2025-12-18	75	189	12	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1841	2025-12-19	75	206	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1842	2025-12-20	75	357	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1843	2025-12-22	75	268	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1844	2025-12-23	75	155	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1845	2025-12-24	75	378	13	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1846	2025-12-25	75	306	5	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1847	2025-12-26	75	383	2	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1848	2025-12-27	75	224	19	Seed data	NHAP_TAY	\N	f	\N	2026-01-16 03:38:21.584	\N	2026-01-16 03:38:21.584
1849	2026-01-01	52	249	12	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1850	2026-01-02	52	225	12	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1851	2026-01-03	52	336	9	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1852	2026-01-05	52	163	13	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1853	2026-01-06	52	368	15	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1854	2026-01-07	52	198	12	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1855	2026-01-08	52	218	14	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1856	2026-01-09	52	199	14	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1857	2026-01-10	52	396	2	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1858	2026-01-12	52	330	13	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1859	2026-01-13	52	224	11	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1860	2026-01-14	52	162	11	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1861	2026-01-15	52	184	5	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1862	2026-01-16	52	371	3	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1863	2026-01-17	52	192	15	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1864	2026-01-19	52	388	4	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1865	2026-01-20	52	208	9	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1866	2026-01-01	53	320	16	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1867	2026-01-02	53	162	16	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1868	2026-01-03	53	383	13	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1869	2026-01-05	53	151	9	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1870	2026-01-06	53	347	12	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1871	2026-01-07	53	349	11	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1872	2026-01-08	53	235	14	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1873	2026-01-09	53	319	3	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1874	2026-01-10	53	152	15	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1875	2026-01-12	53	162	10	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1876	2026-01-13	53	383	16	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1877	2026-01-14	53	366	13	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1878	2026-01-15	53	236	8	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1879	2026-01-16	53	210	15	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1880	2026-01-17	53	349	15	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1881	2026-01-19	53	375	12	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1882	2026-01-20	53	370	3	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1883	2026-01-01	54	156	11	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1884	2026-01-02	54	390	10	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1885	2026-01-03	54	181	16	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1886	2026-01-05	54	162	14	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1887	2026-01-06	54	244	4	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1888	2026-01-07	54	168	4	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1889	2026-01-08	54	326	12	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1890	2026-01-09	54	151	5	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1891	2026-01-10	54	290	4	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1892	2026-01-12	54	355	3	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1893	2026-01-13	54	180	7	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1894	2026-01-14	54	312	5	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1895	2026-01-15	54	152	4	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1896	2026-01-16	54	370	12	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1897	2026-01-17	54	318	9	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1898	2026-01-19	54	234	8	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1899	2026-01-20	54	154	9	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1900	2026-01-01	56	365	7	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1901	2026-01-02	56	337	15	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1902	2026-01-03	56	323	16	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1903	2026-01-05	56	339	16	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1904	2026-01-06	56	286	2	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1905	2026-01-07	56	398	2	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1906	2026-01-08	56	320	14	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1907	2026-01-09	56	250	3	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1908	2026-01-10	56	332	5	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1909	2026-01-12	56	303	7	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1910	2026-01-13	56	191	6	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1911	2026-01-14	56	288	10	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1912	2026-01-15	56	358	5	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1913	2026-01-16	56	307	14	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1914	2026-01-17	56	163	9	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1915	2026-01-19	56	186	8	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1916	2026-01-20	56	199	12	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1917	2026-01-01	57	169	11	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1918	2026-01-02	57	220	10	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1919	2026-01-03	57	362	16	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1920	2026-01-05	57	210	7	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1921	2026-01-06	57	368	16	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1922	2026-01-07	57	162	2	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1923	2026-01-08	57	158	6	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1924	2026-01-09	57	292	15	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1925	2026-01-10	57	220	12	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1926	2026-01-12	57	230	11	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1927	2026-01-13	57	184	16	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1928	2026-01-14	57	268	8	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1929	2026-01-15	57	326	8	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1930	2026-01-16	57	155	14	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1931	2026-01-17	57	313	5	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1932	2026-01-19	57	187	8	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1933	2026-01-20	57	175	8	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1934	2026-01-01	58	348	6	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1935	2026-01-02	58	189	3	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1936	2026-01-03	58	244	2	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1937	2026-01-05	58	178	4	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1938	2026-01-06	58	240	3	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1939	2026-01-07	58	340	14	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1940	2026-01-08	58	259	14	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1941	2026-01-09	58	157	12	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1942	2026-01-10	58	197	8	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1943	2026-01-12	58	313	6	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1944	2026-01-13	58	237	9	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1945	2026-01-14	58	389	6	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1946	2026-01-15	58	275	13	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1947	2026-01-16	58	355	3	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1948	2026-01-17	58	306	2	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1949	2026-01-19	58	185	14	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1950	2026-01-20	58	381	14	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1951	2026-01-01	59	157	4	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1952	2026-01-02	59	212	2	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1953	2026-01-03	59	278	2	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1954	2026-01-05	59	154	9	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1955	2026-01-06	59	174	12	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1956	2026-01-07	59	199	5	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1957	2026-01-08	59	203	6	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1958	2026-01-09	59	216	14	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1959	2026-01-10	59	366	13	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1960	2026-01-12	59	313	4	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1961	2026-01-13	59	258	12	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1962	2026-01-14	59	172	7	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1963	2026-01-15	59	192	5	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1964	2026-01-16	59	176	3	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1965	2026-01-17	59	184	10	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1966	2026-01-19	59	284	13	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1967	2026-01-20	59	271	6	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1968	2026-01-01	60	313	7	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1969	2026-01-02	60	238	12	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1970	2026-01-03	60	311	6	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1971	2026-01-05	60	370	11	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1972	2026-01-06	60	176	3	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1973	2026-01-07	60	316	6	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1974	2026-01-08	60	345	3	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1975	2026-01-09	60	347	14	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1976	2026-01-10	60	368	5	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1977	2026-01-12	60	301	9	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1978	2026-01-13	60	151	12	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1979	2026-01-14	60	376	15	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1980	2026-01-15	60	392	14	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1981	2026-01-16	60	337	5	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1982	2026-01-17	60	383	15	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1983	2026-01-19	60	271	13	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1984	2026-01-20	60	281	10	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1985	2026-01-01	63	229	4	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1986	2026-01-02	63	272	5	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1987	2026-01-03	63	185	13	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1988	2026-01-05	63	178	12	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1989	2026-01-06	63	392	9	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1990	2026-01-07	63	190	15	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1991	2026-01-08	63	271	15	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1992	2026-01-09	63	277	12	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1993	2026-01-10	63	380	10	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1994	2026-01-12	63	209	2	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1995	2026-01-13	63	209	15	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1996	2026-01-14	63	293	4	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1997	2026-01-15	63	379	15	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1998	2026-01-16	63	372	16	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
1999	2026-01-17	63	156	13	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2000	2026-01-19	63	340	3	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2001	2026-01-20	63	155	15	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2002	2026-01-01	64	373	15	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2003	2026-01-02	64	174	13	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2004	2026-01-03	64	341	3	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2005	2026-01-05	64	393	3	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2006	2026-01-06	64	208	7	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2007	2026-01-07	64	358	4	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2008	2026-01-08	64	240	15	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2009	2026-01-09	64	388	12	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2010	2026-01-10	64	286	5	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2011	2026-01-12	64	157	5	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2012	2026-01-13	64	213	3	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2013	2026-01-14	64	172	15	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2014	2026-01-15	64	184	13	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2015	2026-01-16	64	390	5	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2016	2026-01-17	64	202	13	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2017	2026-01-19	64	227	4	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2018	2026-01-20	64	310	15	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2019	2026-01-01	75	340	4	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2020	2026-01-02	75	170	2	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2021	2026-01-03	75	244	16	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2022	2026-01-05	75	309	6	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2023	2026-01-06	75	301	12	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2024	2026-01-07	75	181	5	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2025	2026-01-08	75	271	13	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2026	2026-01-09	75	359	6	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2027	2026-01-10	75	210	7	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2028	2026-01-12	75	364	16	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2029	2026-01-13	75	398	16	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2030	2026-01-14	75	321	11	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2031	2026-01-15	75	302	8	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2032	2026-01-16	75	290	2	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2033	2026-01-17	75	213	9	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2034	2026-01-19	75	258	7	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
2035	2026-01-20	75	251	7	Seed data T1/2026	NHAP_TAY	\N	f	\N	2026-01-20 07:51:01.534	\N	2026-01-20 07:51:01.534
\.


--
-- Data for Name: snapshot_bang_luong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.snapshot_bang_luong (id, bang_luong_id, nhan_vien_id, ma_nhan_vien, ho_ten, phong_ban, phong_ban_id, don_vi_con_id, don_vi_con, khoan_luong_id, ma_khoan, ten_khoan, loai_khoan, so_tien, nguon, ngay_chot, nguoi_chot, ngay_tao) FROM stdin;
1	1	52	NV0013	TRẦN THỊ TUYẾT LÊ	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	4550000	NHAP_TAY	2026-01-16 02:15:55.785	admin	2026-01-16 02:15:55.792
2	1	53	NV0014	DƯ THỊ ƯƠNG	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	4550000	NHAP_TAY	2026-01-16 02:15:55.785	admin	2026-01-16 02:15:55.792
3	1	54	NV0015	SƠN THỊ NGỌC HUYỀN	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	4550000	NHAP_TAY	2026-01-16 02:15:55.785	admin	2026-01-16 02:15:55.792
4	1	56	NV0017	TRẦN THỊ THANH HƯƠNG	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	4550000	NHAP_TAY	2026-01-16 02:15:55.785	admin	2026-01-16 02:15:55.792
5	1	57	NV0018	TRẦN THỊ NGỌC THANH	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	4550000	NHAP_TAY	2026-01-16 02:15:55.785	admin	2026-01-16 02:15:55.792
6	1	58	NV0019	BÙI THỊ ÁI VÂN	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	4550000	NHAP_TAY	2026-01-16 02:15:55.785	admin	2026-01-16 02:15:55.792
7	1	59	NV0020	NGUYỄN THỊ THU	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	4550000	NHAP_TAY	2026-01-16 02:15:55.785	admin	2026-01-16 02:15:55.792
8	1	60	NV0021	PHẠM THỊ MINH	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	4550000	NHAP_TAY	2026-01-16 02:15:55.785	admin	2026-01-16 02:15:55.792
9	1	63	NV0024	LÊ THỊ THÙY TRANG	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	4550000	NHAP_TAY	2026-01-16 02:15:55.785	admin	2026-01-16 02:15:55.792
10	1	64	NV0025	NGUYỄN LÝ HỒNG NGỌC	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	4550000	NHAP_TAY	2026-01-16 02:15:55.785	admin	2026-01-16 02:15:55.792
11	1	75	NV0037	LÊ PHẠM HÀ	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	4550000	NHAP_TAY	2026-01-16 02:15:55.785	admin	2026-01-16 02:15:55.792
12	9	52	NV0013	TRẦN THỊ TUYẾT LÊ	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	22367849	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
13	9	53	NV0014	DƯ THỊ ƯƠNG	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	23893474	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
14	9	54	NV0015	SƠN THỊ NGỌC HUYỀN	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8135348	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
15	9	56	NV0017	TRẦN THỊ THANH HƯƠNG	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	9843573	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
16	9	57	NV0018	TRẦN THỊ NGỌC THANH	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24883067	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
17	9	58	NV0019	BÙI THỊ ÁI VÂN	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	4550000	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
18	9	59	NV0020	NGUYỄN THỊ THU	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8827070	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
19	9	60	NV0021	PHẠM THỊ MINH	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	13295806	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
20	9	63	NV0024	LÊ THỊ THÙY TRANG	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24730984	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
21	9	64	NV0025	NGUYỄN LÝ HỒNG NGỌC	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8024563	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
22	9	75	NV0037	LÊ PHẠM HÀ	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	10699264	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
23	10	65	NV0026	NGUYỄN NHẬT TUẤN	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	14561283	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
24	10	66	NV0027	PHẠM NGỌC AN	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17089333	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
25	10	67	NV0028	HOÀNG HÙNG	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	18696781	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
26	10	68	NV0029	TRẦN ĐỨC TÚ	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	15251178	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
27	10	71	NV0033	LÝ VĂN HÒA	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	9147181	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
28	10	72	NV0034	HUỲNH PHƯỚC HẢI	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17499573	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
29	11	46	NV0007	PHẠM MINH MẪN	Đơn hàng	25	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24166926	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
30	11	47	NV0008	LÂM HUỲNH THẠCH QUÝ	Đơn hàng	25	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	13818416	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
31	11	48	NV0009	NGUYỄN ÁI KHANH	Đơn hàng	25	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	16520402	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
32	11	49	NV0010	NGUYỄN VŨ HOÀNG	Đơn hàng	25	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24781719	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
33	12	69	NV0030	TRẦN QUỐC VŨ	Thu mua	33	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	15448774	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
34	12	76	NV0038	PHẠM VĂN HÙNG	Thu mua	33	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	12880296	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
35	12	77	NV0039	HOÀNG TỬ LẬP	Thu mua	33	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	14636476	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
36	14	55	NV0016	VÕ THỊ BÍCH DUNG	Kho vận	26	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17220845	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
37	14	70	NV0032	NGUYỄN THÀNH BẢO	Kho vận	26	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	10049353	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
38	15	40	NV0001	ĐỖ MỘNG CHÚC ANH	Kế Toán	30	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	10536967	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
39	15	42	NV0003	LÂM NHƯ NGỌC	Kế Toán	30	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8217432	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
40	15	50	NV0011	TRẦN THỊ DIỆU LINH	Kế Toán	30	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17631264	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
41	16	73	NV0035	TRẦN THỊ ÁI NHI	Marketing	24	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	20823594	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
42	16	74	NV0036	TRƯƠNG MỸ DUYÊN	Marketing	24	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17498431	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
43	18	44	NV0005	NGUYỄN ÁI MINH TRIỆU	Kinh Doanh	31	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8982627	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
44	18	45	NV0006	NGUYỄN THỊ THANH THÚY	Kinh Doanh	31	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	16304049	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
45	21	52	NV0013	TRẦN THỊ TUYẾT LÊ	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	22367849	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
46	21	53	NV0014	DƯ THỊ ƯƠNG	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	23893474	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
47	21	54	NV0015	SƠN THỊ NGỌC HUYỀN	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8135348	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
48	21	56	NV0017	TRẦN THỊ THANH HƯƠNG	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	9843573	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
49	21	57	NV0018	TRẦN THỊ NGỌC THANH	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24883067	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
50	21	58	NV0019	BÙI THỊ ÁI VÂN	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	4550000	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
51	21	59	NV0020	NGUYỄN THỊ THU	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8827070	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
52	21	60	NV0021	PHẠM THỊ MINH	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	13295806	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
53	21	63	NV0024	LÊ THỊ THÙY TRANG	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24730984	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
54	21	64	NV0025	NGUYỄN LÝ HỒNG NGỌC	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8024563	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
55	21	75	NV0037	LÊ PHẠM HÀ	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	10699264	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
56	22	65	NV0026	NGUYỄN NHẬT TUẤN	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	14561283	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
57	22	66	NV0027	PHẠM NGỌC AN	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17089333	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
58	22	67	NV0028	HOÀNG HÙNG	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	18696781	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
59	22	68	NV0029	TRẦN ĐỨC TÚ	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	15251178	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
60	22	71	NV0033	LÝ VĂN HÒA	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	9147181	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
61	22	72	NV0034	HUỲNH PHƯỚC HẢI	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17499573	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
62	23	46	NV0007	PHẠM MINH MẪN	Đơn hàng	25	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24166926	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
63	23	47	NV0008	LÂM HUỲNH THẠCH QUÝ	Đơn hàng	25	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	13818416	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
64	23	48	NV0009	NGUYỄN ÁI KHANH	Đơn hàng	25	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	16520402	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
65	23	49	NV0010	NGUYỄN VŨ HOÀNG	Đơn hàng	25	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24781719	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
66	24	69	NV0030	TRẦN QUỐC VŨ	Thu mua	33	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	15448774	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
67	24	76	NV0038	PHẠM VĂN HÙNG	Thu mua	33	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	12880296	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
68	24	77	NV0039	HOÀNG TỬ LẬP	Thu mua	33	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	14636476	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
69	26	55	NV0016	VÕ THỊ BÍCH DUNG	Kho vận	26	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17220845	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
70	26	70	NV0032	NGUYỄN THÀNH BẢO	Kho vận	26	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	10049353	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
71	27	40	NV0001	ĐỖ MỘNG CHÚC ANH	Kế Toán	30	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	10536967	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
72	27	42	NV0003	LÂM NHƯ NGỌC	Kế Toán	30	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8217432	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
73	27	50	NV0011	TRẦN THỊ DIỆU LINH	Kế Toán	30	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17631264	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
74	28	73	NV0035	TRẦN THỊ ÁI NHI	Marketing	24	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	20823594	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
75	28	74	NV0036	TRƯƠNG MỸ DUYÊN	Marketing	24	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17498431	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
76	30	44	NV0005	NGUYỄN ÁI MINH TRIỆU	Kinh Doanh	31	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8982627	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
77	30	45	NV0006	NGUYỄN THỊ THANH THÚY	Kinh Doanh	31	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	16304049	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
78	33	52	NV0013	TRẦN THỊ TUYẾT LÊ	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	22367849	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
79	33	53	NV0014	DƯ THỊ ƯƠNG	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	23893474	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
80	33	54	NV0015	SƠN THỊ NGỌC HUYỀN	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8135348	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
81	33	56	NV0017	TRẦN THỊ THANH HƯƠNG	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	9843573	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
82	33	57	NV0018	TRẦN THỊ NGỌC THANH	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24883067	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
83	33	58	NV0019	BÙI THỊ ÁI VÂN	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	4550000	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
84	33	59	NV0020	NGUYỄN THỊ THU	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8827070	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
85	33	60	NV0021	PHẠM THỊ MINH	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	13295806	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
86	33	63	NV0024	LÊ THỊ THÙY TRANG	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24730984	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
87	33	64	NV0025	NGUYỄN LÝ HỒNG NGỌC	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8024563	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
88	33	75	NV0037	LÊ PHẠM HÀ	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	10699264	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
89	34	65	NV0026	NGUYỄN NHẬT TUẤN	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	14561283	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
90	34	66	NV0027	PHẠM NGỌC AN	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17089333	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
91	34	67	NV0028	HOÀNG HÙNG	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	18696781	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
92	34	68	NV0029	TRẦN ĐỨC TÚ	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	15251178	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
93	34	71	NV0033	LÝ VĂN HÒA	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	9147181	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
94	34	72	NV0034	HUỲNH PHƯỚC HẢI	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17499573	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
95	35	46	NV0007	PHẠM MINH MẪN	Đơn hàng	25	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24166926	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
96	35	47	NV0008	LÂM HUỲNH THẠCH QUÝ	Đơn hàng	25	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	13818416	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
97	35	48	NV0009	NGUYỄN ÁI KHANH	Đơn hàng	25	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	16520402	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
98	35	49	NV0010	NGUYỄN VŨ HOÀNG	Đơn hàng	25	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24781719	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
99	36	69	NV0030	TRẦN QUỐC VŨ	Thu mua	33	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	15448774	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
100	36	76	NV0038	PHẠM VĂN HÙNG	Thu mua	33	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	12880296	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
101	36	77	NV0039	HOÀNG TỬ LẬP	Thu mua	33	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	14636476	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
102	38	55	NV0016	VÕ THỊ BÍCH DUNG	Kho vận	26	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17220845	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
103	38	70	NV0032	NGUYỄN THÀNH BẢO	Kho vận	26	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	10049353	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
104	39	40	NV0001	ĐỖ MỘNG CHÚC ANH	Kế Toán	30	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	10536967	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
105	39	42	NV0003	LÂM NHƯ NGỌC	Kế Toán	30	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8217432	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
106	39	50	NV0011	TRẦN THỊ DIỆU LINH	Kế Toán	30	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17631264	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
107	40	73	NV0035	TRẦN THỊ ÁI NHI	Marketing	24	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	20823594	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
108	40	74	NV0036	TRƯƠNG MỸ DUYÊN	Marketing	24	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17498431	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
109	42	44	NV0005	NGUYỄN ÁI MINH TRIỆU	Kinh Doanh	31	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8982627	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
110	42	45	NV0006	NGUYỄN THỊ THANH THÚY	Kinh Doanh	31	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	16304049	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
111	45	52	NV0013	TRẦN THỊ TUYẾT LÊ	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	22367849	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
112	45	53	NV0014	DƯ THỊ ƯƠNG	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	23893474	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
113	45	54	NV0015	SƠN THỊ NGỌC HUYỀN	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8135348	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
114	45	56	NV0017	TRẦN THỊ THANH HƯƠNG	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	9843573	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
115	45	57	NV0018	TRẦN THỊ NGỌC THANH	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24883067	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
116	45	58	NV0019	BÙI THỊ ÁI VÂN	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	4550000	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
117	45	59	NV0020	NGUYỄN THỊ THU	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8827070	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
118	45	60	NV0021	PHẠM THỊ MINH	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	13295806	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
119	45	63	NV0024	LÊ THỊ THÙY TRANG	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24730984	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
120	45	64	NV0025	NGUYỄN LÝ HỒNG NGỌC	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8024563	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
121	45	75	NV0037	LÊ PHẠM HÀ	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	10699264	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
122	46	65	NV0026	NGUYỄN NHẬT TUẤN	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	14561283	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
123	46	66	NV0027	PHẠM NGỌC AN	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17089333	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
124	46	67	NV0028	HOÀNG HÙNG	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	18696781	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
125	46	68	NV0029	TRẦN ĐỨC TÚ	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	15251178	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
126	46	71	NV0033	LÝ VĂN HÒA	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	9147181	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
127	46	72	NV0034	HUỲNH PHƯỚC HẢI	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17499573	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
128	47	46	NV0007	PHẠM MINH MẪN	Đơn hàng	25	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24166926	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
129	47	47	NV0008	LÂM HUỲNH THẠCH QUÝ	Đơn hàng	25	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	13818416	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
130	47	48	NV0009	NGUYỄN ÁI KHANH	Đơn hàng	25	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	16520402	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
131	47	49	NV0010	NGUYỄN VŨ HOÀNG	Đơn hàng	25	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24781719	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
132	48	69	NV0030	TRẦN QUỐC VŨ	Thu mua	33	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	15448774	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
133	48	76	NV0038	PHẠM VĂN HÙNG	Thu mua	33	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	12880296	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
134	48	77	NV0039	HOÀNG TỬ LẬP	Thu mua	33	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	14636476	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
135	50	55	NV0016	VÕ THỊ BÍCH DUNG	Kho vận	26	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17220845	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
136	50	70	NV0032	NGUYỄN THÀNH BẢO	Kho vận	26	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	10049353	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
137	51	40	NV0001	ĐỖ MỘNG CHÚC ANH	Kế Toán	30	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	10536967	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
138	51	42	NV0003	LÂM NHƯ NGỌC	Kế Toán	30	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8217432	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
139	51	50	NV0011	TRẦN THỊ DIỆU LINH	Kế Toán	30	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17631264	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
140	52	73	NV0035	TRẦN THỊ ÁI NHI	Marketing	24	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	20823594	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
141	52	74	NV0036	TRƯƠNG MỸ DUYÊN	Marketing	24	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17498431	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
142	54	44	NV0005	NGUYỄN ÁI MINH TRIỆU	Kinh Doanh	31	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8982627	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
190	70	67	NV0028	HOÀNG HÙNG	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	18696781	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
143	54	45	NV0006	NGUYỄN THỊ THANH THÚY	Kinh Doanh	31	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	16304049	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
144	57	52	NV0013	TRẦN THỊ TUYẾT LÊ	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	22367849	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
145	57	53	NV0014	DƯ THỊ ƯƠNG	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	23893474	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
146	57	54	NV0015	SƠN THỊ NGỌC HUYỀN	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8135348	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
147	57	56	NV0017	TRẦN THỊ THANH HƯƠNG	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	9843573	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
148	57	57	NV0018	TRẦN THỊ NGỌC THANH	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24883067	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
149	57	58	NV0019	BÙI THỊ ÁI VÂN	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	4550000	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
150	57	59	NV0020	NGUYỄN THỊ THU	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8827070	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
151	57	60	NV0021	PHẠM THỊ MINH	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	13295806	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
152	57	63	NV0024	LÊ THỊ THÙY TRANG	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24730984	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
153	57	64	NV0025	NGUYỄN LÝ HỒNG NGỌC	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8024563	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
154	57	75	NV0037	LÊ PHẠM HÀ	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	10699264	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
155	58	65	NV0026	NGUYỄN NHẬT TUẤN	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	14561283	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
156	58	66	NV0027	PHẠM NGỌC AN	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17089333	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
157	58	67	NV0028	HOÀNG HÙNG	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	18696781	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
158	58	68	NV0029	TRẦN ĐỨC TÚ	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	15251178	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
159	58	71	NV0033	LÝ VĂN HÒA	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	9147181	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
160	58	72	NV0034	HUỲNH PHƯỚC HẢI	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17499573	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
161	59	46	NV0007	PHẠM MINH MẪN	Đơn hàng	25	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24166926	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
162	59	47	NV0008	LÂM HUỲNH THẠCH QUÝ	Đơn hàng	25	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	13818416	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
163	59	48	NV0009	NGUYỄN ÁI KHANH	Đơn hàng	25	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	16520402	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
164	59	49	NV0010	NGUYỄN VŨ HOÀNG	Đơn hàng	25	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24781719	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
165	60	69	NV0030	TRẦN QUỐC VŨ	Thu mua	33	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	15448774	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
166	60	76	NV0038	PHẠM VĂN HÙNG	Thu mua	33	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	12880296	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
167	60	77	NV0039	HOÀNG TỬ LẬP	Thu mua	33	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	14636476	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
168	62	55	NV0016	VÕ THỊ BÍCH DUNG	Kho vận	26	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17220845	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
169	62	70	NV0032	NGUYỄN THÀNH BẢO	Kho vận	26	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	10049353	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
170	63	40	NV0001	ĐỖ MỘNG CHÚC ANH	Kế Toán	30	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	10536967	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
171	63	42	NV0003	LÂM NHƯ NGỌC	Kế Toán	30	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8217432	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
172	63	50	NV0011	TRẦN THỊ DIỆU LINH	Kế Toán	30	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17631264	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
173	64	73	NV0035	TRẦN THỊ ÁI NHI	Marketing	24	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	20823594	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
174	64	74	NV0036	TRƯƠNG MỸ DUYÊN	Marketing	24	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17498431	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
175	66	44	NV0005	NGUYỄN ÁI MINH TRIỆU	Kinh Doanh	31	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8982627	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
176	66	45	NV0006	NGUYỄN THỊ THANH THÚY	Kinh Doanh	31	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	16304049	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
177	69	52	NV0013	TRẦN THỊ TUYẾT LÊ	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	22367849	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
178	69	53	NV0014	DƯ THỊ ƯƠNG	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	23893474	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
179	69	54	NV0015	SƠN THỊ NGỌC HUYỀN	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8135348	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
180	69	56	NV0017	TRẦN THỊ THANH HƯƠNG	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	9843573	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
181	69	57	NV0018	TRẦN THỊ NGỌC THANH	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24883067	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
182	69	58	NV0019	BÙI THỊ ÁI VÂN	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	4550000	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
183	69	59	NV0020	NGUYỄN THỊ THU	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8827070	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
184	69	60	NV0021	PHẠM THỊ MINH	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	13295806	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
185	69	63	NV0024	LÊ THỊ THÙY TRANG	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24730984	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
186	69	64	NV0025	NGUYỄN LÝ HỒNG NGỌC	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8024563	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
187	69	75	NV0037	LÊ PHẠM HÀ	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	10699264	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
188	70	65	NV0026	NGUYỄN NHẬT TUẤN	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	14561283	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
189	70	66	NV0027	PHẠM NGỌC AN	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17089333	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
191	70	68	NV0029	TRẦN ĐỨC TÚ	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	15251178	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
192	70	71	NV0033	LÝ VĂN HÒA	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	9147181	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
193	70	72	NV0034	HUỲNH PHƯỚC HẢI	Giao hàng	32	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17499573	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
194	71	46	NV0007	PHẠM MINH MẪN	Đơn hàng	25	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24166926	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
195	71	47	NV0008	LÂM HUỲNH THẠCH QUÝ	Đơn hàng	25	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	13818416	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
196	71	48	NV0009	NGUYỄN ÁI KHANH	Đơn hàng	25	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	16520402	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
197	71	49	NV0010	NGUYỄN VŨ HOÀNG	Đơn hàng	25	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24781719	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
198	72	69	NV0030	TRẦN QUỐC VŨ	Thu mua	33	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	15448774	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
199	72	76	NV0038	PHẠM VĂN HÙNG	Thu mua	33	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	12880296	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
200	72	77	NV0039	HOÀNG TỬ LẬP	Thu mua	33	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	14636476	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
201	74	55	NV0016	VÕ THỊ BÍCH DUNG	Kho vận	26	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17220845	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
202	74	70	NV0032	NGUYỄN THÀNH BẢO	Kho vận	26	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	10049353	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
203	75	40	NV0001	ĐỖ MỘNG CHÚC ANH	Kế Toán	30	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	10536967	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
204	75	42	NV0003	LÂM NHƯ NGỌC	Kế Toán	30	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8217432	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
205	75	50	NV0011	TRẦN THỊ DIỆU LINH	Kế Toán	30	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17631264	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
206	76	73	NV0035	TRẦN THỊ ÁI NHI	Marketing	24	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	20823594	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
207	76	74	NV0036	TRƯƠNG MỸ DUYÊN	Marketing	24	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17498431	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
208	78	44	NV0005	NGUYỄN ÁI MINH TRIỆU	Kinh Doanh	31	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8982627	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
209	78	45	NV0006	NGUYỄN THỊ THANH THÚY	Kinh Doanh	31	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	16304049	CO_DINH	2026-01-16 03:41:21.368	admin	2026-01-16 03:41:21.368
210	98	73	NV0035	TRẦN THỊ ÁI NHI	Marketing	24	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	20823594	NHAP_TAY	2026-01-20 06:37:55.592	admin	2026-01-20 06:37:55.604
211	98	73	NV0035	TRẦN THỊ ÁI NHI	Marketing	24	\N	\N	23	PHU_CAP_XANG_XE	Phụ cấp xăng xe	THU_NHAP	748545	CO_DINH	2026-01-20 06:37:55.592	admin	2026-01-20 06:37:55.604
212	98	73	NV0035	TRẦN THỊ ÁI NHI	Marketing	24	\N	\N	25	HO_TRO_CHUYEN_CAN	Hỗ trợ chuyên cần	THU_NHAP	622927	CO_DINH	2026-01-20 06:37:55.592	admin	2026-01-20 06:37:55.604
213	98	73	NV0035	TRẦN THỊ ÁI NHI	Marketing	24	\N	\N	26	HO_TRO_AN_CA	Hỗ trợ ăn ca	THU_NHAP	552262	CO_DINH	2026-01-20 06:37:55.592	admin	2026-01-20 06:37:55.604
214	98	74	NV0036	TRƯƠNG MỸ DUYÊN	Marketing	24	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	17498431	NHAP_TAY	2026-01-20 06:37:55.592	admin	2026-01-20 06:37:55.604
215	98	74	NV0036	TRƯƠNG MỸ DUYÊN	Marketing	24	\N	\N	23	PHU_CAP_XANG_XE	Phụ cấp xăng xe	THU_NHAP	534318	CO_DINH	2026-01-20 06:37:55.592	admin	2026-01-20 06:37:55.604
216	98	74	NV0036	TRƯƠNG MỸ DUYÊN	Marketing	24	\N	\N	25	HO_TRO_CHUYEN_CAN	Hỗ trợ chuyên cần	THU_NHAP	948057	CO_DINH	2026-01-20 06:37:55.592	admin	2026-01-20 06:37:55.604
217	98	74	NV0036	TRƯƠNG MỸ DUYÊN	Marketing	24	\N	\N	26	HO_TRO_AN_CA	Hỗ trợ ăn ca	THU_NHAP	896457	CO_DINH	2026-01-20 06:37:55.592	admin	2026-01-20 06:37:55.604
218	98	73	NV0035	TRẦN THỊ ÁI NHI	Marketing	24	\N	\N	31	BHXH_NV	BHXH/BHYT/BHTN (NV đóng)	KHAU_TRU	2186478	NHAP_TAY	2026-01-20 06:37:55.592	admin	2026-01-20 06:37:55.604
219	98	73	NV0035	TRẦN THỊ ÁI NHI	Marketing	24	\N	\N	35	THUE_TNCN	Thuế TNCN	KHAU_TRU	706085	NHAP_TAY	2026-01-20 06:37:55.592	admin	2026-01-20 06:37:55.604
220	98	74	NV0036	TRƯƠNG MỸ DUYÊN	Marketing	24	\N	\N	31	BHXH_NV	BHXH/BHYT/BHTN (NV đóng)	KHAU_TRU	1837334	NHAP_TAY	2026-01-20 06:37:55.592	admin	2026-01-20 06:37:55.604
221	98	74	NV0036	TRƯƠNG MỸ DUYÊN	Marketing	24	\N	\N	35	THUE_TNCN	Thuế TNCN	KHAU_TRU	453993	NHAP_TAY	2026-01-20 06:37:55.592	admin	2026-01-20 06:37:55.604
222	92	52	NV0013	TRẦN THỊ TUYẾT LÊ	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	22367849	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
223	92	52	NV0013	TRẦN THỊ TUYẾT LÊ	Chia hàng	27	\N	\N	23	PHU_CAP_XANG_XE	Phụ cấp xăng xe	THU_NHAP	431917	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
224	92	52	NV0013	TRẦN THỊ TUYẾT LÊ	Chia hàng	27	\N	\N	25	HO_TRO_CHUYEN_CAN	Hỗ trợ chuyên cần	THU_NHAP	719543	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
225	92	52	NV0013	TRẦN THỊ TUYẾT LÊ	Chia hàng	27	\N	\N	26	HO_TRO_AN_CA	Hỗ trợ ăn ca	THU_NHAP	714076	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
226	92	53	NV0014	DƯ THỊ ƯƠNG	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	23893474	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
227	92	53	NV0014	DƯ THỊ ƯƠNG	Chia hàng	27	\N	\N	23	PHU_CAP_XANG_XE	Phụ cấp xăng xe	THU_NHAP	700692	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
228	92	53	NV0014	DƯ THỊ ƯƠNG	Chia hàng	27	\N	\N	25	HO_TRO_CHUYEN_CAN	Hỗ trợ chuyên cần	THU_NHAP	610560	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
229	92	53	NV0014	DƯ THỊ ƯƠNG	Chia hàng	27	\N	\N	26	HO_TRO_AN_CA	Hỗ trợ ăn ca	THU_NHAP	571663	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
230	92	54	NV0015	SƠN THỊ NGỌC HUYỀN	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8135348	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
231	92	54	NV0015	SƠN THỊ NGỌC HUYỀN	Chia hàng	27	\N	\N	23	PHU_CAP_XANG_XE	Phụ cấp xăng xe	THU_NHAP	547146	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
232	92	54	NV0015	SƠN THỊ NGỌC HUYỀN	Chia hàng	27	\N	\N	25	HO_TRO_CHUYEN_CAN	Hỗ trợ chuyên cần	THU_NHAP	657846	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
233	92	54	NV0015	SƠN THỊ NGỌC HUYỀN	Chia hàng	27	\N	\N	26	HO_TRO_AN_CA	Hỗ trợ ăn ca	THU_NHAP	757840	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
234	92	56	NV0017	TRẦN THỊ THANH HƯƠNG	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	9843573	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
235	92	56	NV0017	TRẦN THỊ THANH HƯƠNG	Chia hàng	27	\N	\N	23	PHU_CAP_XANG_XE	Phụ cấp xăng xe	THU_NHAP	621619	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
236	92	56	NV0017	TRẦN THỊ THANH HƯƠNG	Chia hàng	27	\N	\N	25	HO_TRO_CHUYEN_CAN	Hỗ trợ chuyên cần	THU_NHAP	670704	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
237	92	56	NV0017	TRẦN THỊ THANH HƯƠNG	Chia hàng	27	\N	\N	26	HO_TRO_AN_CA	Hỗ trợ ăn ca	THU_NHAP	662074	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
238	92	57	NV0018	TRẦN THỊ NGỌC THANH	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24883067	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
239	92	57	NV0018	TRẦN THỊ NGỌC THANH	Chia hàng	27	\N	\N	23	PHU_CAP_XANG_XE	Phụ cấp xăng xe	THU_NHAP	602508	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
240	92	57	NV0018	TRẦN THỊ NGỌC THANH	Chia hàng	27	\N	\N	25	HO_TRO_CHUYEN_CAN	Hỗ trợ chuyên cần	THU_NHAP	724657	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
241	92	57	NV0018	TRẦN THỊ NGỌC THANH	Chia hàng	27	\N	\N	26	HO_TRO_AN_CA	Hỗ trợ ăn ca	THU_NHAP	796608	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
242	92	58	NV0019	BÙI THỊ ÁI VÂN	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	4550000	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
243	92	58	NV0019	BÙI THỊ ÁI VÂN	Chia hàng	27	\N	\N	23	PHU_CAP_XANG_XE	Phụ cấp xăng xe	THU_NHAP	702243	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
244	92	58	NV0019	BÙI THỊ ÁI VÂN	Chia hàng	27	\N	\N	25	HO_TRO_CHUYEN_CAN	Hỗ trợ chuyên cần	THU_NHAP	881605	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
245	92	58	NV0019	BÙI THỊ ÁI VÂN	Chia hàng	27	\N	\N	26	HO_TRO_AN_CA	Hỗ trợ ăn ca	THU_NHAP	922374	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
246	92	59	NV0020	NGUYỄN THỊ THU	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8827070	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
247	92	59	NV0020	NGUYỄN THỊ THU	Chia hàng	27	\N	\N	23	PHU_CAP_XANG_XE	Phụ cấp xăng xe	THU_NHAP	393035	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
248	92	59	NV0020	NGUYỄN THỊ THU	Chia hàng	27	\N	\N	25	HO_TRO_CHUYEN_CAN	Hỗ trợ chuyên cần	THU_NHAP	936686	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
249	92	59	NV0020	NGUYỄN THỊ THU	Chia hàng	27	\N	\N	26	HO_TRO_AN_CA	Hỗ trợ ăn ca	THU_NHAP	892738	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
250	92	60	NV0021	PHẠM THỊ MINH	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	13295806	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
251	92	60	NV0021	PHẠM THỊ MINH	Chia hàng	27	\N	\N	23	PHU_CAP_XANG_XE	Phụ cấp xăng xe	THU_NHAP	314510	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
252	92	60	NV0021	PHẠM THỊ MINH	Chia hàng	27	\N	\N	25	HO_TRO_CHUYEN_CAN	Hỗ trợ chuyên cần	THU_NHAP	784829	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
253	92	60	NV0021	PHẠM THỊ MINH	Chia hàng	27	\N	\N	26	HO_TRO_AN_CA	Hỗ trợ ăn ca	THU_NHAP	825739	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
254	92	63	NV0024	LÊ THỊ THÙY TRANG	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	24730984	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
255	92	63	NV0024	LÊ THỊ THÙY TRANG	Chia hàng	27	\N	\N	23	PHU_CAP_XANG_XE	Phụ cấp xăng xe	THU_NHAP	358689	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
256	92	63	NV0024	LÊ THỊ THÙY TRANG	Chia hàng	27	\N	\N	25	HO_TRO_CHUYEN_CAN	Hỗ trợ chuyên cần	THU_NHAP	674529	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
257	92	63	NV0024	LÊ THỊ THÙY TRANG	Chia hàng	27	\N	\N	26	HO_TRO_AN_CA	Hỗ trợ ăn ca	THU_NHAP	550014	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
258	92	64	NV0025	NGUYỄN LÝ HỒNG NGỌC	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	8024563	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
259	92	64	NV0025	NGUYỄN LÝ HỒNG NGỌC	Chia hàng	27	\N	\N	23	PHU_CAP_XANG_XE	Phụ cấp xăng xe	THU_NHAP	670927	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
260	92	64	NV0025	NGUYỄN LÝ HỒNG NGỌC	Chia hàng	27	\N	\N	25	HO_TRO_CHUYEN_CAN	Hỗ trợ chuyên cần	THU_NHAP	530497	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
261	92	64	NV0025	NGUYỄN LÝ HỒNG NGỌC	Chia hàng	27	\N	\N	26	HO_TRO_AN_CA	Hỗ trợ ăn ca	THU_NHAP	972679	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
262	92	75	NV0037	LÊ PHẠM HÀ	Chia hàng	27	\N	\N	21	LUONG_CO_BAN	Lương cơ bản	THU_NHAP	10699264	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
263	92	75	NV0037	LÊ PHẠM HÀ	Chia hàng	27	\N	\N	23	PHU_CAP_XANG_XE	Phụ cấp xăng xe	THU_NHAP	505386	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
264	92	75	NV0037	LÊ PHẠM HÀ	Chia hàng	27	\N	\N	25	HO_TRO_CHUYEN_CAN	Hỗ trợ chuyên cần	THU_NHAP	970823	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
265	92	75	NV0037	LÊ PHẠM HÀ	Chia hàng	27	\N	\N	26	HO_TRO_AN_CA	Hỗ trợ ăn ca	THU_NHAP	901417	CO_DINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
266	92	52	NV0013	TRẦN THỊ TUYẾT LÊ	Chia hàng	27	\N	\N	41	KHAU_TRU_UNG_LUONG	Khấu trừ ứng lương	KHAU_TRU	300000	DIEU_CHINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
267	92	53	NV0014	DƯ THỊ ƯƠNG	Chia hàng	27	\N	\N	41	KHAU_TRU_UNG_LUONG	Khấu trừ ứng lương	KHAU_TRU	300000	DIEU_CHINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
268	92	54	NV0015	SƠN THỊ NGỌC HUYỀN	Chia hàng	27	\N	\N	41	KHAU_TRU_UNG_LUONG	Khấu trừ ứng lương	KHAU_TRU	300000	DIEU_CHINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
269	92	56	NV0017	TRẦN THỊ THANH HƯƠNG	Chia hàng	27	\N	\N	41	KHAU_TRU_UNG_LUONG	Khấu trừ ứng lương	KHAU_TRU	300000	DIEU_CHINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
270	92	57	NV0018	TRẦN THỊ NGỌC THANH	Chia hàng	27	\N	\N	41	KHAU_TRU_UNG_LUONG	Khấu trừ ứng lương	KHAU_TRU	300000	DIEU_CHINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
271	92	58	NV0019	BÙI THỊ ÁI VÂN	Chia hàng	27	\N	\N	41	KHAU_TRU_UNG_LUONG	Khấu trừ ứng lương	KHAU_TRU	300000	DIEU_CHINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
272	92	59	NV0020	NGUYỄN THỊ THU	Chia hàng	27	\N	\N	41	KHAU_TRU_UNG_LUONG	Khấu trừ ứng lương	KHAU_TRU	300000	DIEU_CHINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
273	92	60	NV0021	PHẠM THỊ MINH	Chia hàng	27	\N	\N	41	KHAU_TRU_UNG_LUONG	Khấu trừ ứng lương	KHAU_TRU	300000	DIEU_CHINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
274	92	63	NV0024	LÊ THỊ THÙY TRANG	Chia hàng	27	\N	\N	41	KHAU_TRU_UNG_LUONG	Khấu trừ ứng lương	KHAU_TRU	300000	DIEU_CHINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
275	92	64	NV0025	NGUYỄN LÝ HỒNG NGỌC	Chia hàng	27	\N	\N	41	KHAU_TRU_UNG_LUONG	Khấu trừ ứng lương	KHAU_TRU	300000	DIEU_CHINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
276	92	75	NV0037	LÊ PHẠM HÀ	Chia hàng	27	\N	\N	41	KHAU_TRU_UNG_LUONG	Khấu trừ ứng lương	KHAU_TRU	300000	DIEU_CHINH	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
277	92	52	NV0013	TRẦN THỊ TUYẾT LÊ	Chia hàng	27	\N	\N	31	BHXH_NV	BHXH/BHYT/BHTN (NV đóng)	KHAU_TRU	2348624	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
278	92	52	NV0013	TRẦN THỊ TUYẾT LÊ	Chia hàng	27	\N	\N	35	THUE_TNCN	Thuế TNCN	KHAU_TRU	882714	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
279	92	53	NV0014	DƯ THỊ ƯƠNG	Chia hàng	27	\N	\N	31	BHXH_NV	BHXH/BHYT/BHTN (NV đóng)	KHAU_TRU	2508815	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
280	92	53	NV0014	DƯ THỊ ƯƠNG	Chia hàng	27	\N	\N	35	THUE_TNCN	Thuế TNCN	KHAU_TRU	1090136	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
281	92	54	NV0015	SƠN THỊ NGỌC HUYỀN	Chia hàng	27	\N	\N	31	BHXH_NV	BHXH/BHYT/BHTN (NV đóng)	KHAU_TRU	854211	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
282	92	56	NV0017	TRẦN THỊ THANH HƯƠNG	Chia hàng	27	\N	\N	31	BHXH_NV	BHXH/BHYT/BHTN (NV đóng)	KHAU_TRU	1033576	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
283	92	57	NV0018	TRẦN THỊ NGỌC THANH	Chia hàng	27	\N	\N	31	BHXH_NV	BHXH/BHYT/BHTN (NV đóng)	KHAU_TRU	2612722	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
284	92	57	NV0018	TRẦN THỊ NGỌC THANH	Chia hàng	27	\N	\N	35	THUE_TNCN	Thuế TNCN	KHAU_TRU	1259118	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
285	92	58	NV0019	BÙI THỊ ÁI VÂN	Chia hàng	27	\N	\N	31	BHXH_NV	BHXH/BHYT/BHTN (NV đóng)	KHAU_TRU	477750	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
286	92	59	NV0020	NGUYỄN THỊ THU	Chia hàng	27	\N	\N	31	BHXH_NV	BHXH/BHYT/BHTN (NV đóng)	KHAU_TRU	926843	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
287	92	60	NV0021	PHẠM THỊ MINH	Chia hàng	27	\N	\N	31	BHXH_NV	BHXH/BHYT/BHTN (NV đóng)	KHAU_TRU	1396059	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
288	92	60	NV0021	PHẠM THỊ MINH	Chia hàng	27	\N	\N	35	THUE_TNCN	Thuế TNCN	KHAU_TRU	141241	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
289	92	63	NV0024	LÊ THỊ THÙY TRANG	Chia hàng	27	\N	\N	31	BHXH_NV	BHXH/BHYT/BHTN (NV đóng)	KHAU_TRU	2596754	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
290	92	63	NV0024	LÊ THỊ THÙY TRANG	Chia hàng	27	\N	\N	35	THUE_TNCN	Thuế TNCN	KHAU_TRU	1157619	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
291	92	64	NV0025	NGUYỄN LÝ HỒNG NGỌC	Chia hàng	27	\N	\N	31	BHXH_NV	BHXH/BHYT/BHTN (NV đóng)	KHAU_TRU	842579	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
292	92	75	NV0037	LÊ PHẠM HÀ	Chia hàng	27	\N	\N	31	BHXH_NV	BHXH/BHYT/BHTN (NV đóng)	KHAU_TRU	1123423	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
293	92	75	NV0037	LÊ PHẠM HÀ	Chia hàng	27	\N	\N	35	THUE_TNCN	Thuế TNCN	KHAU_TRU	47673	NHAP_TAY	2026-01-20 06:41:10.083	admin	2026-01-20 06:41:10.106
\.


--
-- Data for Name: snapshot_bang_ung_luong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.snapshot_bang_ung_luong (id, bang_ung_luong_id, ma_bang_ung_luong, thang_nam, tu_ngay, den_ngay, cau_hinh_json, tong_so_tien_ung, so_nhan_vien_ung, ngay_chot, nguoi_chot, ngay_tao) FROM stdin;
2	86	UL2026-01-27	2026-01	2026-01-01	2026-01-15	\N	3300000	11	2026-01-20 06:21:17.454	admin	2026-01-20 06:21:17.464
3	97	UL-202601-10	2026-01	2026-01-01	2026-01-15	{"chuyen_can":{"so_ngay_nghi_toi_da":2,"cam_neu_nghi_khong_phep":true},"ung_luong":{"ti_le_toi_da":0.7,"lam_tron":10000}}	8000000	3	2026-01-20 08:21:11.447	admin	2026-01-20 08:21:11.458
\.


--
-- Data for Name: snapshot_chi_tiet_bang_ung_luong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.snapshot_chi_tiet_bang_ung_luong (id, snapshot_id, nhan_vien_id, ma_nhan_vien, ho_ten, phong_ban, nhom_nhan_vien, tien_cong_luy_ke, muc_toi_da_duoc_ung, so_ngay_cong, so_ngay_nghi, so_ngay_nghi_khong_phep, duoc_phep_ung, ly_do_khong_dat, so_tien_ung_de_xuat, so_tien_ung_duyet, ghi_chu, input_data_json, ngay_tao) FROM stdin;
4	2	52	NV0013	TRẦN THỊ TUYẾT LÊ	Chia hàng	\N	2625000	1837500	15.00	0.00	0.00	t	\N	4000000	300000	\N	\N	2026-01-20 06:21:17.475
5	2	53	NV0014	DƯ THỊ ƯƠNG	Chia hàng	\N	2625000	1837500	15.00	0.00	0.00	t	\N	4000000	300000	\N	\N	2026-01-20 06:21:17.475
6	2	54	NV0015	SƠN THỊ NGỌC HUYỀN	Chia hàng	\N	2625000	1837500	15.00	0.00	0.00	t	\N	3000000	300000	\N	\N	2026-01-20 06:21:17.475
7	2	56	NV0017	TRẦN THỊ THANH HƯƠNG	Chia hàng	\N	2625000	1837500	15.00	0.00	0.00	t	\N	4000000	300000	\N	\N	2026-01-20 06:21:17.475
8	2	57	NV0018	TRẦN THỊ NGỌC THANH	Chia hàng	\N	2625000	1837500	15.00	0.00	0.00	t	\N	5000000	300000	\N	\N	2026-01-20 06:21:17.475
9	2	58	NV0019	BÙI THỊ ÁI VÂN	Chia hàng	\N	2625000	1837500	15.00	0.00	0.00	t	\N	2000000	300000	\N	\N	2026-01-20 06:21:17.475
10	2	59	NV0020	NGUYỄN THỊ THU	Chia hàng	\N	2625000	1837500	15.00	0.00	0.00	t	\N	2000000	300000	\N	\N	2026-01-20 06:21:17.475
11	2	60	NV0021	PHẠM THỊ MINH	Chia hàng	\N	2625000	1837500	15.00	0.00	0.00	t	\N	3000000	300000	\N	\N	2026-01-20 06:21:17.475
12	2	63	NV0024	LÊ THỊ THÙY TRANG	Chia hàng	\N	2625000	1837500	15.00	0.00	0.00	t	\N	5000000	300000	\N	\N	2026-01-20 06:21:17.475
13	2	64	NV0025	NGUYỄN LÝ HỒNG NGỌC	Chia hàng	\N	2625000	1837500	15.00	0.00	0.00	t	\N	2000000	300000	\N	\N	2026-01-20 06:21:17.475
14	2	75	NV0037	LÊ PHẠM HÀ	Chia hàng	\N	2625000	1837500	15.00	0.00	0.00	t	\N	5000000	300000	\N	\N	2026-01-20 06:21:17.475
15	3	40	NV0001	ĐỖ MỘNG CHÚC ANH	Kế Toán	Nhóm Văn phòng	5268484	3680000	11.00	0.00	0.00	t	\N	0	3000000	\N	\N	2026-01-20 08:21:11.466
16	3	42	NV0003	LÂM NHƯ NGỌC	Kế Toán	Nhóm Văn phòng	4108716	2870000	11.00	0.00	0.00	t	\N	0	2000000	\N	\N	2026-01-20 08:21:11.466
17	3	50	NV0011	TRẦN THỊ DIỆU LINH	Kế Toán	Nhóm Văn phòng	8815632	6170000	11.00	0.00	0.00	t	\N	0	3000000	\N	\N	2026-01-20 08:21:11.466
\.


--
-- Data for Name: snapshot_giao_hang; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.snapshot_giao_hang (id, bang_luong_id, nhan_vien_id, tong_khoi_luong_thanh_cong, tong_so_lan_tre_gio, tong_so_lan_khong_lay_phieu) FROM stdin;
7	94	66	2320.62	2	0
8	94	72	1833.73	6	3
9	94	65	2230.05	2	3
10	94	71	1903.42	6	6
11	94	67	2027.95	4	4
12	94	68	2315.00	1	0
19	103	66	2320.62	2	0
20	103	72	1833.73	6	3
21	103	65	2230.05	2	3
22	103	71	1903.42	6	6
23	103	67	2027.95	4	4
24	103	68	2315.00	1	0
25	95	66	2320.62	2	0
26	95	72	1833.73	6	3
27	95	65	2230.05	2	3
28	95	71	1903.42	6	6
29	95	67	2027.95	4	4
30	95	68	2315.00	1	0
\.


--
-- Data for Name: snapshot_san_luong_chia_hang; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.snapshot_san_luong_chia_hang (id, bang_luong_id, nhan_vien_id, tong_sp_dat, tong_sp_loi) FROM stdin;
12	94	54	4143	137
13	94	64	4616	150
14	94	60	5276	160
15	94	75	4782	147
16	94	52	4411	174
17	94	56	4945	151
18	94	58	4593	133
19	94	53	4869	201
20	94	63	4487	178
21	94	59	3809	127
22	94	57	3999	173
34	103	54	4143	137
35	103	64	4616	150
36	103	60	5276	160
37	103	75	4782	147
38	103	52	4411	174
39	103	56	4945	151
40	103	58	4593	133
41	103	53	4869	201
42	103	63	4487	178
43	103	59	3809	127
44	103	57	3999	173
45	95	54	4143	137
46	95	64	4616	150
47	95	60	5276	160
48	95	75	4782	147
49	95	52	4411	174
50	95	56	4945	151
51	95	58	4593	133
52	95	53	4869	201
53	95	63	4487	178
54	95	59	3809	127
55	95	57	3999	173
\.


--
-- Data for Name: su_kien_thuong_phat; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.su_kien_thuong_phat (id, nhan_vien_id, phong_ban_id, ngay, loai_su_kien, ma_su_kien, gia_tri, so_tien, ghi_chu, trang_thai, duyet_boi, duyet_luc, nguoi_tao, ngay_tao, ngay_cap_nhat) FROM stdin;
\.


--
-- Data for Name: template_kpi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.template_kpi (id, ma_template, ten_template, phong_ban_id, mo_ta, trang_thai, ngay_tao, ngay_cap_nhat) FROM stdin;
1	TPL_DEFAULT	Template KPI Mặc định	\N	Template đánh giá KPI mặc định cho tất cả phòng ban	t	2026-01-16 03:41:21.457	2026-01-16 03:41:21.457
\.


--
-- Data for Name: thiet_bi_nhan_vien; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.thiet_bi_nhan_vien (id, nhan_vien_id, device_id, ten_thiet_bi, user_agent, platform, ip_address, trang_thai, ngay_dang_ky, lan_dang_nhap_cuoi, nguoi_reset_id, ly_do_reset, ngay_reset, ngay_tao, ngay_cap_nhat) FROM stdin;
\.


--
-- Data for Name: thong_bao; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.thong_bao (id, nguoi_nhan_id, loai_thong_bao, tieu_de, noi_dung, link, da_doc, ngay_doc, du_lieu_them, ngay_tao) FROM stdin;
\.


--
-- Data for Name: thong_tin_cong_ty; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.thong_tin_cong_ty (id, ten_cong_ty, ma_so_thue, dia_chi, dien_thoai, email, website, logo, nguoi_dai_dien, chuc_vu_dai_dien, ngay_cong_chuan_mac_dinh, ngay_tao, ngay_cap_nhat) FROM stdin;
1	CÔNG TY TNHH NÔNG SẢN THỰC PHẨM TRẦN GIA		30 Kha Vạn Cân, P. Hiệp Bình Chánh, TP. Thủ Đức, TP.HCM			http://rausachtrangia.com	https://tg.rausachtrangia.com/images/logo.svg			26	2026-01-15 04:29:46.268	2026-01-16 00:29:45.073
\.


--
-- Data for Name: vai_tro; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vai_tro (id, ma_vai_tro, ten_vai_tro, mo_ta, cap_do, trang_thai, ngay_tao) FROM stdin;
1	ADMIN	Quản trị viên	Toàn quyền hệ thống	100	t	2026-01-15 03:46:08.746
5	EMPLOYEE	Nhân viên	Quyền nhân viên cơ bản	10	t	2026-01-24 00:39:01.258
\.


--
-- Data for Name: vai_tro_quyen; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vai_tro_quyen (id, vai_tro_id, quyen_id, ngay_tao) FROM stdin;
1	1	1	2026-01-23 05:56:37.52
2	1	2	2026-01-23 05:56:37.52
3	1	3	2026-01-23 05:56:37.52
4	1	4	2026-01-23 05:56:37.52
5	1	5	2026-01-23 05:56:37.52
6	1	6	2026-01-23 05:56:37.52
\.


--
-- Data for Name: yeu_cau_sua_cong; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.yeu_cau_sua_cong (id, nhan_vien_id, ngay_cham_cong, gio_vao_cu, gio_ra_cu, trang_thai_cu, gio_vao_moi, gio_ra_moi, trang_thai_moi, ly_do, bang_chung, trang_thai_duyet, nguoi_duyet_id, ngay_duyet, ly_do_tu_choi, nguoi_tao_id, ngay_tao, ngay_cap_nhat) FROM stdin;
\.


--
-- Name: ai_rule_audit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ai_rule_audit_id_seq', 2, true);


--
-- Name: audit_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.audit_log_id_seq', 102, true);


--
-- Name: audit_sua_du_lieu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.audit_sua_du_lieu_id_seq', 1, false);


--
-- Name: bac_thue_tncn_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bac_thue_tncn_id_seq', 14, true);


--
-- Name: bang_ghi_cham_cong_gps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bang_ghi_cham_cong_gps_id_seq', 5, true);


--
-- Name: bang_luong_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bang_luong_id_seq', 103, true);


--
-- Name: bang_luong_quy_che_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bang_luong_quy_che_id_seq', 4, true);


--
-- Name: bang_tinh_bhxh_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bang_tinh_bhxh_id_seq', 13, true);


--
-- Name: bang_tinh_thue_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bang_tinh_thue_id_seq', 13, true);


--
-- Name: bang_ung_luong_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bang_ung_luong_id_seq', 97, true);


--
-- Name: bien_so_cong_thuc_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bien_so_cong_thuc_id_seq', 1, false);


--
-- Name: ca_lam_viec_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ca_lam_viec_id_seq', 8, true);


--
-- Name: cau_hinh_bhxh_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cau_hinh_bhxh_id_seq', 4, true);


--
-- Name: cau_hinh_don_gia_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cau_hinh_don_gia_id_seq', 5, true);


--
-- Name: cau_hinh_geofence_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cau_hinh_geofence_id_seq', 1, false);


--
-- Name: cau_hinh_import_phong_ban_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cau_hinh_import_phong_ban_id_seq', 1, false);


--
-- Name: cau_hinh_phat_cham_cong_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cau_hinh_phat_cham_cong_id_seq', 1, false);


--
-- Name: cau_hinh_thue_tncn_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cau_hinh_thue_tncn_id_seq', 4, true);


--
-- Name: cau_hinh_thuong_kpi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cau_hinh_thuong_kpi_id_seq', 1, false);


--
-- Name: cham_cong_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cham_cong_id_seq', 231, true);


--
-- Name: chat_analytics_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chat_analytics_id_seq', 23, true);


--
-- Name: chat_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chat_history_id_seq', 46, true);


--
-- Name: chi_tiet_bang_luong_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chi_tiet_bang_luong_id_seq', 584, true);


--
-- Name: chi_tiet_bang_ung_luong_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chi_tiet_bang_ung_luong_id_seq', 270, true);


--
-- Name: chi_tiet_cham_cong_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chi_tiet_cham_cong_id_seq', 1, false);


--
-- Name: chi_tiet_nghi_phep_ngay_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chi_tiet_nghi_phep_ngay_id_seq', 1, false);


--
-- Name: chi_tiet_phieu_dieu_chinh_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chi_tiet_phieu_dieu_chinh_id_seq', 67, true);


--
-- Name: chi_tieu_kpi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chi_tieu_kpi_id_seq', 1, false);


--
-- Name: co_cau_luong_chi_tiet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.co_cau_luong_chi_tiet_id_seq', 1, false);


--
-- Name: co_cau_luong_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.co_cau_luong_id_seq', 1, false);


--
-- Name: cong_thuc_luong_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cong_thuc_luong_id_seq', 1, false);


--
-- Name: danh_gia_kpi_nhan_vien_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.danh_gia_kpi_nhan_vien_id_seq', 231, true);


--
-- Name: danh_muc_loai_nghi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.danh_muc_loai_nghi_id_seq', 6, true);


--
-- Name: danh_muc_loai_yeu_cau_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.danh_muc_loai_yeu_cau_id_seq', 1, false);


--
-- Name: danh_muc_su_kien_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.danh_muc_su_kien_id_seq', 1, false);


--
-- Name: don_nghi_phep_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.don_nghi_phep_id_seq', 1, false);


--
-- Name: don_vi_con_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.don_vi_con_id_seq', 1, false);


--
-- Name: don_yeu_cau_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.don_yeu_cau_id_seq', 1, false);


--
-- Name: giao_hang_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.giao_hang_id_seq', 1110, true);


--
-- Name: ket_qua_kpi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ket_qua_kpi_id_seq', 1, false);


--
-- Name: khoan_luong_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.khoan_luong_id_seq', 44, true);


--
-- Name: ky_danh_gia_kpi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ky_danh_gia_kpi_id_seq', 9, true);


--
-- Name: lich_phan_ca_chi_tiet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lich_phan_ca_chi_tiet_id_seq', 1, false);


--
-- Name: lich_phan_ca_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lich_phan_ca_id_seq', 3, true);


--
-- Name: lich_su_chinh_sua_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lich_su_chinh_sua_id_seq', 46, true);


--
-- Name: lich_su_cong_thuc_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lich_su_cong_thuc_id_seq', 1, false);


--
-- Name: lich_su_import_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lich_su_import_id_seq', 1, false);


--
-- Name: lich_su_sua_cong_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lich_su_sua_cong_id_seq', 1, false);


--
-- Name: lich_su_thiet_bi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lich_su_thiet_bi_id_seq', 1, false);


--
-- Name: mapping_excel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mapping_excel_id_seq', 1, false);


--
-- Name: ngay_cong_bang_luong_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ngay_cong_bang_luong_id_seq', 20, true);


--
-- Name: nguoi_dung_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nguoi_dung_id_seq', 42, true);


--
-- Name: nguoi_dung_vai_tro_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nguoi_dung_vai_tro_id_seq', 42, true);


--
-- Name: nguoi_phu_thuoc_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nguoi_phu_thuoc_id_seq', 1, false);


--
-- Name: nhan_vien_hop_dong_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nhan_vien_hop_dong_id_seq', 33, true);


--
-- Name: nhan_vien_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nhan_vien_id_seq', 77, true);


--
-- Name: nhan_vien_ngan_hang_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nhan_vien_ngan_hang_id_seq', 33, true);


--
-- Name: nhan_vien_phong_ban_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nhan_vien_phong_ban_id_seq', 1, false);


--
-- Name: nhan_vien_thue_bh_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nhan_vien_thue_bh_id_seq', 1, false);


--
-- Name: nhan_vien_thuoc_nhom_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nhan_vien_thuoc_nhom_id_seq', 28, true);


--
-- Name: nhan_vien_trach_nhiem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nhan_vien_trach_nhiem_id_seq', 1, false);


--
-- Name: nhom_nhan_vien_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.nhom_nhan_vien_id_seq', 4, true);


--
-- Name: phan_quyen_phong_ban_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.phan_quyen_phong_ban_id_seq', 1, false);


--
-- Name: phien_dang_nhap_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.phien_dang_nhap_id_seq', 44, true);


--
-- Name: phieu_dieu_chinh_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.phieu_dieu_chinh_id_seq', 68, true);


--
-- Name: phong_ban_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.phong_ban_id_seq', 34, true);


--
-- Name: phu_cap_nhan_vien_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.phu_cap_nhan_vien_id_seq', 102, true);


--
-- Name: quy_che_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quy_che_id_seq', 2, true);


--
-- Name: quy_che_rule_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quy_che_rule_id_seq', 3, true);


--
-- Name: quyen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quyen_id_seq', 6, true);


--
-- Name: request_mapping_cham_cong_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.request_mapping_cham_cong_id_seq', 1, false);


--
-- Name: request_workflow_config_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.request_workflow_config_id_seq', 1, false);


--
-- Name: rule_trace_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rule_trace_id_seq', 28, true);


--
-- Name: san_luong_chia_hang_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.san_luong_chia_hang_id_seq', 2035, true);


--
-- Name: snapshot_bang_luong_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.snapshot_bang_luong_id_seq', 293, true);


--
-- Name: snapshot_bang_ung_luong_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.snapshot_bang_ung_luong_id_seq', 35, true);


--
-- Name: snapshot_chi_tiet_bang_ung_luong_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.snapshot_chi_tiet_bang_ung_luong_id_seq', 47, true);


--
-- Name: snapshot_giao_hang_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.snapshot_giao_hang_id_seq', 30, true);


--
-- Name: snapshot_san_luong_chia_hang_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.snapshot_san_luong_chia_hang_id_seq', 55, true);


--
-- Name: su_kien_thuong_phat_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.su_kien_thuong_phat_id_seq', 1, false);


--
-- Name: template_kpi_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.template_kpi_id_seq', 1, true);


--
-- Name: thiet_bi_nhan_vien_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.thiet_bi_nhan_vien_id_seq', 1, false);


--
-- Name: thong_bao_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.thong_bao_id_seq', 1, false);


--
-- Name: thong_tin_cong_ty_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.thong_tin_cong_ty_id_seq', 1, true);


--
-- Name: vai_tro_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vai_tro_id_seq', 5, true);


--
-- Name: vai_tro_quyen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vai_tro_quyen_id_seq', 6, true);


--
-- Name: yeu_cau_sua_cong_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.yeu_cau_sua_cong_id_seq', 1, false);


--
-- Name: ai_rule_audit ai_rule_audit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_rule_audit
    ADD CONSTRAINT ai_rule_audit_pkey PRIMARY KEY (id);


--
-- Name: audit_log audit_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_log
    ADD CONSTRAINT audit_log_pkey PRIMARY KEY (id);


--
-- Name: audit_sua_du_lieu audit_sua_du_lieu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_sua_du_lieu
    ADD CONSTRAINT audit_sua_du_lieu_pkey PRIMARY KEY (id);


--
-- Name: bac_thue_tncn bac_thue_tncn_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bac_thue_tncn
    ADD CONSTRAINT bac_thue_tncn_pkey PRIMARY KEY (id);


--
-- Name: bang_ghi_cham_cong_gps bang_ghi_cham_cong_gps_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bang_ghi_cham_cong_gps
    ADD CONSTRAINT bang_ghi_cham_cong_gps_pkey PRIMARY KEY (id);


--
-- Name: bang_luong bang_luong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bang_luong
    ADD CONSTRAINT bang_luong_pkey PRIMARY KEY (id);


--
-- Name: bang_luong_quy_che bang_luong_quy_che_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bang_luong_quy_che
    ADD CONSTRAINT bang_luong_quy_che_pkey PRIMARY KEY (id);


--
-- Name: bang_tinh_bhxh bang_tinh_bhxh_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bang_tinh_bhxh
    ADD CONSTRAINT bang_tinh_bhxh_pkey PRIMARY KEY (id);


--
-- Name: bang_tinh_thue bang_tinh_thue_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bang_tinh_thue
    ADD CONSTRAINT bang_tinh_thue_pkey PRIMARY KEY (id);


--
-- Name: bang_ung_luong bang_ung_luong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bang_ung_luong
    ADD CONSTRAINT bang_ung_luong_pkey PRIMARY KEY (id);


--
-- Name: bien_so_cong_thuc bien_so_cong_thuc_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bien_so_cong_thuc
    ADD CONSTRAINT bien_so_cong_thuc_pkey PRIMARY KEY (id);


--
-- Name: ca_lam_viec ca_lam_viec_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ca_lam_viec
    ADD CONSTRAINT ca_lam_viec_pkey PRIMARY KEY (id);


--
-- Name: cau_hinh_bhxh cau_hinh_bhxh_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cau_hinh_bhxh
    ADD CONSTRAINT cau_hinh_bhxh_pkey PRIMARY KEY (id);


--
-- Name: cau_hinh_don_gia cau_hinh_don_gia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cau_hinh_don_gia
    ADD CONSTRAINT cau_hinh_don_gia_pkey PRIMARY KEY (id);


--
-- Name: cau_hinh_geofence cau_hinh_geofence_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cau_hinh_geofence
    ADD CONSTRAINT cau_hinh_geofence_pkey PRIMARY KEY (id);


--
-- Name: cau_hinh_import_phong_ban cau_hinh_import_phong_ban_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cau_hinh_import_phong_ban
    ADD CONSTRAINT cau_hinh_import_phong_ban_pkey PRIMARY KEY (id);


--
-- Name: cau_hinh_phat_cham_cong cau_hinh_phat_cham_cong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cau_hinh_phat_cham_cong
    ADD CONSTRAINT cau_hinh_phat_cham_cong_pkey PRIMARY KEY (id);


--
-- Name: cau_hinh_thue_tncn cau_hinh_thue_tncn_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cau_hinh_thue_tncn
    ADD CONSTRAINT cau_hinh_thue_tncn_pkey PRIMARY KEY (id);


--
-- Name: cau_hinh_thuong_kpi cau_hinh_thuong_kpi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cau_hinh_thuong_kpi
    ADD CONSTRAINT cau_hinh_thuong_kpi_pkey PRIMARY KEY (id);


--
-- Name: cham_cong cham_cong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cham_cong
    ADD CONSTRAINT cham_cong_pkey PRIMARY KEY (id);


--
-- Name: chat_analytics chat_analytics_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_analytics
    ADD CONSTRAINT chat_analytics_pkey PRIMARY KEY (id);


--
-- Name: chat_history chat_history_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chat_history
    ADD CONSTRAINT chat_history_pkey PRIMARY KEY (id);


--
-- Name: chi_tiet_bang_luong chi_tiet_bang_luong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chi_tiet_bang_luong
    ADD CONSTRAINT chi_tiet_bang_luong_pkey PRIMARY KEY (id);


--
-- Name: chi_tiet_bang_ung_luong chi_tiet_bang_ung_luong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chi_tiet_bang_ung_luong
    ADD CONSTRAINT chi_tiet_bang_ung_luong_pkey PRIMARY KEY (id);


--
-- Name: chi_tiet_cham_cong chi_tiet_cham_cong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chi_tiet_cham_cong
    ADD CONSTRAINT chi_tiet_cham_cong_pkey PRIMARY KEY (id);


--
-- Name: chi_tiet_nghi_phep_ngay chi_tiet_nghi_phep_ngay_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chi_tiet_nghi_phep_ngay
    ADD CONSTRAINT chi_tiet_nghi_phep_ngay_pkey PRIMARY KEY (id);


--
-- Name: chi_tiet_phieu_dieu_chinh chi_tiet_phieu_dieu_chinh_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chi_tiet_phieu_dieu_chinh
    ADD CONSTRAINT chi_tiet_phieu_dieu_chinh_pkey PRIMARY KEY (id);


--
-- Name: chi_tieu_kpi chi_tieu_kpi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chi_tieu_kpi
    ADD CONSTRAINT chi_tieu_kpi_pkey PRIMARY KEY (id);


--
-- Name: co_cau_luong_chi_tiet co_cau_luong_chi_tiet_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.co_cau_luong_chi_tiet
    ADD CONSTRAINT co_cau_luong_chi_tiet_pkey PRIMARY KEY (id);


--
-- Name: co_cau_luong co_cau_luong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.co_cau_luong
    ADD CONSTRAINT co_cau_luong_pkey PRIMARY KEY (id);


--
-- Name: cong_thuc_luong cong_thuc_luong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cong_thuc_luong
    ADD CONSTRAINT cong_thuc_luong_pkey PRIMARY KEY (id);


--
-- Name: danh_gia_kpi_nhan_vien danh_gia_kpi_nhan_vien_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.danh_gia_kpi_nhan_vien
    ADD CONSTRAINT danh_gia_kpi_nhan_vien_pkey PRIMARY KEY (id);


--
-- Name: danh_muc_loai_nghi danh_muc_loai_nghi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.danh_muc_loai_nghi
    ADD CONSTRAINT danh_muc_loai_nghi_pkey PRIMARY KEY (id);


--
-- Name: danh_muc_loai_yeu_cau danh_muc_loai_yeu_cau_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.danh_muc_loai_yeu_cau
    ADD CONSTRAINT danh_muc_loai_yeu_cau_pkey PRIMARY KEY (id);


--
-- Name: danh_muc_su_kien danh_muc_su_kien_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.danh_muc_su_kien
    ADD CONSTRAINT danh_muc_su_kien_pkey PRIMARY KEY (id);


--
-- Name: don_nghi_phep don_nghi_phep_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.don_nghi_phep
    ADD CONSTRAINT don_nghi_phep_pkey PRIMARY KEY (id);


--
-- Name: don_vi_con don_vi_con_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.don_vi_con
    ADD CONSTRAINT don_vi_con_pkey PRIMARY KEY (id);


--
-- Name: don_yeu_cau don_yeu_cau_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.don_yeu_cau
    ADD CONSTRAINT don_yeu_cau_pkey PRIMARY KEY (id);


--
-- Name: giao_hang giao_hang_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.giao_hang
    ADD CONSTRAINT giao_hang_pkey PRIMARY KEY (id);


--
-- Name: ket_qua_kpi ket_qua_kpi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ket_qua_kpi
    ADD CONSTRAINT ket_qua_kpi_pkey PRIMARY KEY (id);


--
-- Name: khoan_luong khoan_luong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.khoan_luong
    ADD CONSTRAINT khoan_luong_pkey PRIMARY KEY (id);


--
-- Name: ky_danh_gia_kpi ky_danh_gia_kpi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ky_danh_gia_kpi
    ADD CONSTRAINT ky_danh_gia_kpi_pkey PRIMARY KEY (id);


--
-- Name: lich_phan_ca_chi_tiet lich_phan_ca_chi_tiet_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lich_phan_ca_chi_tiet
    ADD CONSTRAINT lich_phan_ca_chi_tiet_pkey PRIMARY KEY (id);


--
-- Name: lich_phan_ca lich_phan_ca_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lich_phan_ca
    ADD CONSTRAINT lich_phan_ca_pkey PRIMARY KEY (id);


--
-- Name: lich_su_chinh_sua lich_su_chinh_sua_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lich_su_chinh_sua
    ADD CONSTRAINT lich_su_chinh_sua_pkey PRIMARY KEY (id);


--
-- Name: lich_su_cong_thuc lich_su_cong_thuc_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lich_su_cong_thuc
    ADD CONSTRAINT lich_su_cong_thuc_pkey PRIMARY KEY (id);


--
-- Name: lich_su_import lich_su_import_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lich_su_import
    ADD CONSTRAINT lich_su_import_pkey PRIMARY KEY (id);


--
-- Name: lich_su_sua_cong lich_su_sua_cong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lich_su_sua_cong
    ADD CONSTRAINT lich_su_sua_cong_pkey PRIMARY KEY (id);


--
-- Name: lich_su_thiet_bi lich_su_thiet_bi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lich_su_thiet_bi
    ADD CONSTRAINT lich_su_thiet_bi_pkey PRIMARY KEY (id);


--
-- Name: mapping_excel mapping_excel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mapping_excel
    ADD CONSTRAINT mapping_excel_pkey PRIMARY KEY (id);


--
-- Name: ngay_cong_bang_luong ngay_cong_bang_luong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ngay_cong_bang_luong
    ADD CONSTRAINT ngay_cong_bang_luong_pkey PRIMARY KEY (id);


--
-- Name: nguoi_dung nguoi_dung_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nguoi_dung
    ADD CONSTRAINT nguoi_dung_pkey PRIMARY KEY (id);


--
-- Name: nguoi_dung_vai_tro nguoi_dung_vai_tro_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nguoi_dung_vai_tro
    ADD CONSTRAINT nguoi_dung_vai_tro_pkey PRIMARY KEY (id);


--
-- Name: nguoi_phu_thuoc nguoi_phu_thuoc_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nguoi_phu_thuoc
    ADD CONSTRAINT nguoi_phu_thuoc_pkey PRIMARY KEY (id);


--
-- Name: nhan_vien_hop_dong nhan_vien_hop_dong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien_hop_dong
    ADD CONSTRAINT nhan_vien_hop_dong_pkey PRIMARY KEY (id);


--
-- Name: nhan_vien_ngan_hang nhan_vien_ngan_hang_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien_ngan_hang
    ADD CONSTRAINT nhan_vien_ngan_hang_pkey PRIMARY KEY (id);


--
-- Name: nhan_vien_phong_ban nhan_vien_phong_ban_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien_phong_ban
    ADD CONSTRAINT nhan_vien_phong_ban_pkey PRIMARY KEY (id);


--
-- Name: nhan_vien nhan_vien_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien
    ADD CONSTRAINT nhan_vien_pkey PRIMARY KEY (id);


--
-- Name: nhan_vien_thue_bh nhan_vien_thue_bh_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien_thue_bh
    ADD CONSTRAINT nhan_vien_thue_bh_pkey PRIMARY KEY (id);


--
-- Name: nhan_vien_thuoc_nhom nhan_vien_thuoc_nhom_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien_thuoc_nhom
    ADD CONSTRAINT nhan_vien_thuoc_nhom_pkey PRIMARY KEY (id);


--
-- Name: nhan_vien_trach_nhiem nhan_vien_trach_nhiem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien_trach_nhiem
    ADD CONSTRAINT nhan_vien_trach_nhiem_pkey PRIMARY KEY (id);


--
-- Name: nhom_nhan_vien nhom_nhan_vien_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhom_nhan_vien
    ADD CONSTRAINT nhom_nhan_vien_pkey PRIMARY KEY (id);


--
-- Name: phan_quyen_phong_ban phan_quyen_phong_ban_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phan_quyen_phong_ban
    ADD CONSTRAINT phan_quyen_phong_ban_pkey PRIMARY KEY (id);


--
-- Name: phien_dang_nhap phien_dang_nhap_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phien_dang_nhap
    ADD CONSTRAINT phien_dang_nhap_pkey PRIMARY KEY (id);


--
-- Name: phieu_dieu_chinh phieu_dieu_chinh_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phieu_dieu_chinh
    ADD CONSTRAINT phieu_dieu_chinh_pkey PRIMARY KEY (id);


--
-- Name: phong_ban phong_ban_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phong_ban
    ADD CONSTRAINT phong_ban_pkey PRIMARY KEY (id);


--
-- Name: phu_cap_nhan_vien phu_cap_nhan_vien_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phu_cap_nhan_vien
    ADD CONSTRAINT phu_cap_nhan_vien_pkey PRIMARY KEY (id);


--
-- Name: quy_che quy_che_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quy_che
    ADD CONSTRAINT quy_che_pkey PRIMARY KEY (id);


--
-- Name: quy_che_rule quy_che_rule_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quy_che_rule
    ADD CONSTRAINT quy_che_rule_pkey PRIMARY KEY (id);


--
-- Name: quyen quyen_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quyen
    ADD CONSTRAINT quyen_pkey PRIMARY KEY (id);


--
-- Name: request_mapping_cham_cong request_mapping_cham_cong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_mapping_cham_cong
    ADD CONSTRAINT request_mapping_cham_cong_pkey PRIMARY KEY (id);


--
-- Name: request_workflow_config request_workflow_config_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_workflow_config
    ADD CONSTRAINT request_workflow_config_pkey PRIMARY KEY (id);


--
-- Name: rule_trace rule_trace_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rule_trace
    ADD CONSTRAINT rule_trace_pkey PRIMARY KEY (id);


--
-- Name: san_luong_chia_hang san_luong_chia_hang_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.san_luong_chia_hang
    ADD CONSTRAINT san_luong_chia_hang_pkey PRIMARY KEY (id);


--
-- Name: snapshot_bang_luong snapshot_bang_luong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snapshot_bang_luong
    ADD CONSTRAINT snapshot_bang_luong_pkey PRIMARY KEY (id);


--
-- Name: snapshot_bang_ung_luong snapshot_bang_ung_luong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snapshot_bang_ung_luong
    ADD CONSTRAINT snapshot_bang_ung_luong_pkey PRIMARY KEY (id);


--
-- Name: snapshot_chi_tiet_bang_ung_luong snapshot_chi_tiet_bang_ung_luong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snapshot_chi_tiet_bang_ung_luong
    ADD CONSTRAINT snapshot_chi_tiet_bang_ung_luong_pkey PRIMARY KEY (id);


--
-- Name: snapshot_giao_hang snapshot_giao_hang_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snapshot_giao_hang
    ADD CONSTRAINT snapshot_giao_hang_pkey PRIMARY KEY (id);


--
-- Name: snapshot_san_luong_chia_hang snapshot_san_luong_chia_hang_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snapshot_san_luong_chia_hang
    ADD CONSTRAINT snapshot_san_luong_chia_hang_pkey PRIMARY KEY (id);


--
-- Name: su_kien_thuong_phat su_kien_thuong_phat_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.su_kien_thuong_phat
    ADD CONSTRAINT su_kien_thuong_phat_pkey PRIMARY KEY (id);


--
-- Name: template_kpi template_kpi_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.template_kpi
    ADD CONSTRAINT template_kpi_pkey PRIMARY KEY (id);


--
-- Name: thiet_bi_nhan_vien thiet_bi_nhan_vien_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thiet_bi_nhan_vien
    ADD CONSTRAINT thiet_bi_nhan_vien_pkey PRIMARY KEY (id);


--
-- Name: thong_bao thong_bao_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thong_bao
    ADD CONSTRAINT thong_bao_pkey PRIMARY KEY (id);


--
-- Name: thong_tin_cong_ty thong_tin_cong_ty_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thong_tin_cong_ty
    ADD CONSTRAINT thong_tin_cong_ty_pkey PRIMARY KEY (id);


--
-- Name: vai_tro vai_tro_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vai_tro
    ADD CONSTRAINT vai_tro_pkey PRIMARY KEY (id);


--
-- Name: vai_tro_quyen vai_tro_quyen_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vai_tro_quyen
    ADD CONSTRAINT vai_tro_quyen_pkey PRIMARY KEY (id);


--
-- Name: yeu_cau_sua_cong yeu_cau_sua_cong_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.yeu_cau_sua_cong
    ADD CONSTRAINT yeu_cau_sua_cong_pkey PRIMARY KEY (id);


--
-- Name: ai_rule_audit_nguoi_tao_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ai_rule_audit_nguoi_tao_id_idx ON public.ai_rule_audit USING btree (nguoi_tao_id);


--
-- Name: ai_rule_audit_quy_che_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ai_rule_audit_quy_che_id_idx ON public.ai_rule_audit USING btree (quy_che_id);


--
-- Name: ai_rule_audit_tao_luc_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ai_rule_audit_tao_luc_idx ON public.ai_rule_audit USING btree (tao_luc);


--
-- Name: ai_rule_audit_trang_thai_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ai_rule_audit_trang_thai_idx ON public.ai_rule_audit USING btree (trang_thai);


--
-- Name: audit_log_bang_du_lieu_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX audit_log_bang_du_lieu_idx ON public.audit_log USING btree (bang_du_lieu);


--
-- Name: audit_log_ngay_tao_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX audit_log_ngay_tao_idx ON public.audit_log USING btree (ngay_tao);


--
-- Name: audit_log_nguoi_dung_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX audit_log_nguoi_dung_id_idx ON public.audit_log USING btree (nguoi_dung_id);


--
-- Name: audit_sua_du_lieu_ban_ghi_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX audit_sua_du_lieu_ban_ghi_id_idx ON public.audit_sua_du_lieu USING btree (ban_ghi_id);


--
-- Name: audit_sua_du_lieu_loai_du_lieu_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX audit_sua_du_lieu_loai_du_lieu_idx ON public.audit_sua_du_lieu USING btree (loai_du_lieu);


--
-- Name: audit_sua_du_lieu_sua_boi_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX audit_sua_du_lieu_sua_boi_idx ON public.audit_sua_du_lieu USING btree (sua_boi);


--
-- Name: audit_sua_du_lieu_sua_luc_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX audit_sua_du_lieu_sua_luc_idx ON public.audit_sua_du_lieu USING btree (sua_luc);


--
-- Name: bac_thue_tncn_cau_hinh_thue_id_bac_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX bac_thue_tncn_cau_hinh_thue_id_bac_key ON public.bac_thue_tncn USING btree (cau_hinh_thue_id, bac);


--
-- Name: bang_ghi_cham_cong_gps_geofence_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bang_ghi_cham_cong_gps_geofence_id_idx ON public.bang_ghi_cham_cong_gps USING btree (geofence_id);


--
-- Name: bang_ghi_cham_cong_gps_nhan_vien_id_thoi_gian_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bang_ghi_cham_cong_gps_nhan_vien_id_thoi_gian_idx ON public.bang_ghi_cham_cong_gps USING btree (nhan_vien_id, thoi_gian);


--
-- Name: bang_ghi_cham_cong_gps_thoi_gian_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bang_ghi_cham_cong_gps_thoi_gian_idx ON public.bang_ghi_cham_cong_gps USING btree (thoi_gian);


--
-- Name: bang_ghi_cham_cong_gps_trang_thai_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bang_ghi_cham_cong_gps_trang_thai_idx ON public.bang_ghi_cham_cong_gps USING btree (trang_thai);


--
-- Name: bang_luong_phong_ban_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bang_luong_phong_ban_id_idx ON public.bang_luong USING btree (phong_ban_id);


--
-- Name: bang_luong_quy_che_bang_luong_id_quy_che_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX bang_luong_quy_che_bang_luong_id_quy_che_id_key ON public.bang_luong_quy_che USING btree (bang_luong_id, quy_che_id);


--
-- Name: bang_luong_thang_nam_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bang_luong_thang_nam_idx ON public.bang_luong USING btree (thang, nam);


--
-- Name: bang_luong_thang_nam_phong_ban_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX bang_luong_thang_nam_phong_ban_id_key ON public.bang_luong USING btree (thang, nam, phong_ban_id);


--
-- Name: bang_luong_trang_thai_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bang_luong_trang_thai_idx ON public.bang_luong USING btree (trang_thai);


--
-- Name: bang_tinh_bhxh_bang_luong_id_nhan_vien_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX bang_tinh_bhxh_bang_luong_id_nhan_vien_id_key ON public.bang_tinh_bhxh USING btree (bang_luong_id, nhan_vien_id);


--
-- Name: bang_tinh_thue_bang_luong_id_nhan_vien_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX bang_tinh_thue_bang_luong_id_nhan_vien_id_key ON public.bang_tinh_thue USING btree (bang_luong_id, nhan_vien_id);


--
-- Name: bang_ung_luong_ma_bang_ung_luong_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX bang_ung_luong_ma_bang_ung_luong_key ON public.bang_ung_luong USING btree (ma_bang_ung_luong);


--
-- Name: bang_ung_luong_phong_ban_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bang_ung_luong_phong_ban_id_idx ON public.bang_ung_luong USING btree (phong_ban_id);


--
-- Name: bang_ung_luong_thang_nam_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bang_ung_luong_thang_nam_idx ON public.bang_ung_luong USING btree (thang_nam);


--
-- Name: bang_ung_luong_thang_nam_tu_ngay_den_ngay_phong_ban_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX bang_ung_luong_thang_nam_tu_ngay_den_ngay_phong_ban_id_key ON public.bang_ung_luong USING btree (thang_nam, tu_ngay, den_ngay, phong_ban_id);


--
-- Name: bang_ung_luong_trang_thai_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX bang_ung_luong_trang_thai_idx ON public.bang_ung_luong USING btree (trang_thai);


--
-- Name: bien_so_cong_thuc_cong_thuc_id_ten_bien_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX bien_so_cong_thuc_cong_thuc_id_ten_bien_key ON public.bien_so_cong_thuc USING btree (cong_thuc_id, ten_bien);


--
-- Name: ca_lam_viec_ma_ca_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ca_lam_viec_ma_ca_key ON public.ca_lam_viec USING btree (ma_ca);


--
-- Name: ca_lam_viec_phong_ban_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ca_lam_viec_phong_ban_id_idx ON public.ca_lam_viec USING btree (phong_ban_id);


--
-- Name: ca_lam_viec_trang_thai_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ca_lam_viec_trang_thai_idx ON public.ca_lam_viec USING btree (trang_thai);


--
-- Name: cau_hinh_bhxh_nam_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX cau_hinh_bhxh_nam_key ON public.cau_hinh_bhxh USING btree (nam);


--
-- Name: cau_hinh_don_gia_ma_bien_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX cau_hinh_don_gia_ma_bien_key ON public.cau_hinh_don_gia USING btree (ma_bien);


--
-- Name: cau_hinh_don_gia_ma_bien_phong_ban_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX cau_hinh_don_gia_ma_bien_phong_ban_id_key ON public.cau_hinh_don_gia USING btree (ma_bien, phong_ban_id);


--
-- Name: cau_hinh_geofence_phong_ban_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX cau_hinh_geofence_phong_ban_id_idx ON public.cau_hinh_geofence USING btree (phong_ban_id);


--
-- Name: cau_hinh_geofence_trang_thai_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX cau_hinh_geofence_trang_thai_idx ON public.cau_hinh_geofence USING btree (trang_thai);


--
-- Name: cau_hinh_import_phong_ban_phong_ban_id_loai_import_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX cau_hinh_import_phong_ban_phong_ban_id_loai_import_key ON public.cau_hinh_import_phong_ban USING btree (phong_ban_id, loai_import);


--
-- Name: cau_hinh_phat_cham_cong_nam_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX cau_hinh_phat_cham_cong_nam_key ON public.cau_hinh_phat_cham_cong USING btree (nam);


--
-- Name: cau_hinh_thue_tncn_nam_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX cau_hinh_thue_tncn_nam_key ON public.cau_hinh_thue_tncn USING btree (nam);


--
-- Name: cau_hinh_thuong_kpi_nam_xep_loai_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX cau_hinh_thuong_kpi_nam_xep_loai_key ON public.cau_hinh_thuong_kpi USING btree (nam, xep_loai);


--
-- Name: cham_cong_nhan_vien_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX cham_cong_nhan_vien_id_idx ON public.cham_cong USING btree (nhan_vien_id);


--
-- Name: cham_cong_nhan_vien_id_thang_nam_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX cham_cong_nhan_vien_id_thang_nam_key ON public.cham_cong USING btree (nhan_vien_id, thang, nam);


--
-- Name: cham_cong_thang_nam_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX cham_cong_thang_nam_idx ON public.cham_cong USING btree (thang, nam);


--
-- Name: chat_analytics_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chat_analytics_created_at_idx ON public.chat_analytics USING btree (created_at);


--
-- Name: chat_analytics_session_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chat_analytics_session_id_idx ON public.chat_analytics USING btree (session_id);


--
-- Name: chat_history_created_at_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chat_history_created_at_idx ON public.chat_history USING btree (created_at);


--
-- Name: chat_history_session_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chat_history_session_id_idx ON public.chat_history USING btree (session_id);


--
-- Name: chat_history_user_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chat_history_user_id_idx ON public.chat_history USING btree (user_id);


--
-- Name: chi_tiet_bang_luong_bang_luong_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chi_tiet_bang_luong_bang_luong_id_idx ON public.chi_tiet_bang_luong USING btree (bang_luong_id);


--
-- Name: chi_tiet_bang_luong_bang_luong_id_nhan_vien_id_khoan_luong__key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX chi_tiet_bang_luong_bang_luong_id_nhan_vien_id_khoan_luong__key ON public.chi_tiet_bang_luong USING btree (bang_luong_id, nhan_vien_id, khoan_luong_id);


--
-- Name: chi_tiet_bang_luong_khoan_luong_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chi_tiet_bang_luong_khoan_luong_id_idx ON public.chi_tiet_bang_luong USING btree (khoan_luong_id);


--
-- Name: chi_tiet_bang_luong_nhan_vien_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chi_tiet_bang_luong_nhan_vien_id_idx ON public.chi_tiet_bang_luong USING btree (nhan_vien_id);


--
-- Name: chi_tiet_bang_ung_luong_bang_ung_luong_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chi_tiet_bang_ung_luong_bang_ung_luong_id_idx ON public.chi_tiet_bang_ung_luong USING btree (bang_ung_luong_id);


--
-- Name: chi_tiet_bang_ung_luong_bang_ung_luong_id_nhan_vien_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX chi_tiet_bang_ung_luong_bang_ung_luong_id_nhan_vien_id_key ON public.chi_tiet_bang_ung_luong USING btree (bang_ung_luong_id, nhan_vien_id);


--
-- Name: chi_tiet_bang_ung_luong_nhan_vien_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chi_tiet_bang_ung_luong_nhan_vien_id_idx ON public.chi_tiet_bang_ung_luong USING btree (nhan_vien_id);


--
-- Name: chi_tiet_bang_ung_luong_phong_ban_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chi_tiet_bang_ung_luong_phong_ban_id_idx ON public.chi_tiet_bang_ung_luong USING btree (phong_ban_id);


--
-- Name: chi_tiet_cham_cong_ca_lam_viec_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chi_tiet_cham_cong_ca_lam_viec_id_idx ON public.chi_tiet_cham_cong USING btree (ca_lam_viec_id);


--
-- Name: chi_tiet_cham_cong_ngay_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chi_tiet_cham_cong_ngay_idx ON public.chi_tiet_cham_cong USING btree (ngay);


--
-- Name: chi_tiet_cham_cong_nhan_vien_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chi_tiet_cham_cong_nhan_vien_id_idx ON public.chi_tiet_cham_cong USING btree (nhan_vien_id);


--
-- Name: chi_tiet_cham_cong_nhan_vien_id_ngay_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX chi_tiet_cham_cong_nhan_vien_id_ngay_key ON public.chi_tiet_cham_cong USING btree (nhan_vien_id, ngay);


--
-- Name: chi_tiet_nghi_phep_ngay_don_nghi_phep_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chi_tiet_nghi_phep_ngay_don_nghi_phep_id_idx ON public.chi_tiet_nghi_phep_ngay USING btree (don_nghi_phep_id);


--
-- Name: chi_tiet_nghi_phep_ngay_nhan_vien_id_ngay_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX chi_tiet_nghi_phep_ngay_nhan_vien_id_ngay_idx ON public.chi_tiet_nghi_phep_ngay USING btree (nhan_vien_id, ngay);


--
-- Name: chi_tiet_nghi_phep_ngay_nhan_vien_id_ngay_loai_nghi_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX chi_tiet_nghi_phep_ngay_nhan_vien_id_ngay_loai_nghi_id_key ON public.chi_tiet_nghi_phep_ngay USING btree (nhan_vien_id, ngay, loai_nghi_id);


--
-- Name: chi_tieu_kpi_template_id_ma_chi_tieu_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX chi_tieu_kpi_template_id_ma_chi_tieu_key ON public.chi_tieu_kpi USING btree (template_id, ma_chi_tieu);


--
-- Name: co_cau_luong_chi_tiet_co_cau_luong_id_khoan_luong_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX co_cau_luong_chi_tiet_co_cau_luong_id_khoan_luong_id_key ON public.co_cau_luong_chi_tiet USING btree (co_cau_luong_id, khoan_luong_id);


--
-- Name: cong_thuc_luong_ma_cong_thuc_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX cong_thuc_luong_ma_cong_thuc_key ON public.cong_thuc_luong USING btree (ma_cong_thuc);


--
-- Name: danh_gia_kpi_nhan_vien_ky_danh_gia_id_nhan_vien_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX danh_gia_kpi_nhan_vien_ky_danh_gia_id_nhan_vien_id_key ON public.danh_gia_kpi_nhan_vien USING btree (ky_danh_gia_id, nhan_vien_id);


--
-- Name: danh_muc_loai_nghi_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX danh_muc_loai_nghi_is_active_idx ON public.danh_muc_loai_nghi USING btree (is_active);


--
-- Name: danh_muc_loai_nghi_ma_loai_nghi_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX danh_muc_loai_nghi_ma_loai_nghi_key ON public.danh_muc_loai_nghi USING btree (ma_loai_nghi);


--
-- Name: danh_muc_loai_nghi_nhom_loai_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX danh_muc_loai_nghi_nhom_loai_idx ON public.danh_muc_loai_nghi USING btree (nhom_loai);


--
-- Name: danh_muc_loai_yeu_cau_is_active_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX danh_muc_loai_yeu_cau_is_active_idx ON public.danh_muc_loai_yeu_cau USING btree (is_active);


--
-- Name: danh_muc_loai_yeu_cau_ma_loai_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX danh_muc_loai_yeu_cau_ma_loai_key ON public.danh_muc_loai_yeu_cau USING btree (ma_loai);


--
-- Name: danh_muc_loai_yeu_cau_nhom_loai_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX danh_muc_loai_yeu_cau_nhom_loai_idx ON public.danh_muc_loai_yeu_cau USING btree (nhom_loai);


--
-- Name: danh_muc_su_kien_ma_su_kien_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX danh_muc_su_kien_ma_su_kien_key ON public.danh_muc_su_kien USING btree (ma_su_kien);


--
-- Name: don_nghi_phep_loai_nghi_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX don_nghi_phep_loai_nghi_id_idx ON public.don_nghi_phep USING btree (loai_nghi_id);


--
-- Name: don_nghi_phep_ma_don_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX don_nghi_phep_ma_don_key ON public.don_nghi_phep USING btree (ma_don);


--
-- Name: don_nghi_phep_nhan_vien_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX don_nghi_phep_nhan_vien_id_idx ON public.don_nghi_phep USING btree (nhan_vien_id);


--
-- Name: don_nghi_phep_nhan_vien_id_tu_ngay_den_ngay_loai_nghi_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX don_nghi_phep_nhan_vien_id_tu_ngay_den_ngay_loai_nghi_id_key ON public.don_nghi_phep USING btree (nhan_vien_id, tu_ngay, den_ngay, loai_nghi_id);


--
-- Name: don_nghi_phep_phong_ban_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX don_nghi_phep_phong_ban_id_idx ON public.don_nghi_phep USING btree (phong_ban_id);


--
-- Name: don_nghi_phep_trang_thai_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX don_nghi_phep_trang_thai_idx ON public.don_nghi_phep USING btree (trang_thai);


--
-- Name: don_nghi_phep_tu_ngay_den_ngay_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX don_nghi_phep_tu_ngay_den_ngay_idx ON public.don_nghi_phep USING btree (tu_ngay, den_ngay);


--
-- Name: don_vi_con_phong_ban_id_ma_don_vi_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX don_vi_con_phong_ban_id_ma_don_vi_key ON public.don_vi_con USING btree (phong_ban_id, ma_don_vi);


--
-- Name: don_yeu_cau_loai_yeu_cau_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX don_yeu_cau_loai_yeu_cau_id_idx ON public.don_yeu_cau USING btree (loai_yeu_cau_id);


--
-- Name: don_yeu_cau_ma_don_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX don_yeu_cau_ma_don_key ON public.don_yeu_cau USING btree (ma_don);


--
-- Name: don_yeu_cau_ngay_yeu_cau_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX don_yeu_cau_ngay_yeu_cau_idx ON public.don_yeu_cau USING btree (ngay_yeu_cau);


--
-- Name: don_yeu_cau_nguoi_duyet_1_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX don_yeu_cau_nguoi_duyet_1_id_idx ON public.don_yeu_cau USING btree (nguoi_duyet_1_id);


--
-- Name: don_yeu_cau_nguoi_duyet_2_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX don_yeu_cau_nguoi_duyet_2_id_idx ON public.don_yeu_cau USING btree (nguoi_duyet_2_id);


--
-- Name: don_yeu_cau_nhan_vien_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX don_yeu_cau_nhan_vien_id_idx ON public.don_yeu_cau USING btree (nhan_vien_id);


--
-- Name: don_yeu_cau_nhan_vien_id_ngay_yeu_cau_loai_yeu_cau_id_gio_b_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX don_yeu_cau_nhan_vien_id_ngay_yeu_cau_loai_yeu_cau_id_gio_b_key ON public.don_yeu_cau USING btree (nhan_vien_id, ngay_yeu_cau, loai_yeu_cau_id, gio_bat_dau);


--
-- Name: don_yeu_cau_phong_ban_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX don_yeu_cau_phong_ban_id_idx ON public.don_yeu_cau USING btree (phong_ban_id);


--
-- Name: don_yeu_cau_trang_thai_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX don_yeu_cau_trang_thai_idx ON public.don_yeu_cau USING btree (trang_thai);


--
-- Name: giao_hang_import_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX giao_hang_import_id_idx ON public.giao_hang USING btree (import_id);


--
-- Name: giao_hang_ngay_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX giao_hang_ngay_idx ON public.giao_hang USING btree (ngay);


--
-- Name: giao_hang_ngay_nhan_vien_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX giao_hang_ngay_nhan_vien_id_key ON public.giao_hang USING btree (ngay, nhan_vien_id);


--
-- Name: giao_hang_nhan_vien_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX giao_hang_nhan_vien_id_idx ON public.giao_hang USING btree (nhan_vien_id);


--
-- Name: ket_qua_kpi_danh_gia_id_chi_tieu_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ket_qua_kpi_danh_gia_id_chi_tieu_id_key ON public.ket_qua_kpi USING btree (danh_gia_id, chi_tieu_id);


--
-- Name: khoan_luong_ma_khoan_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX khoan_luong_ma_khoan_key ON public.khoan_luong USING btree (ma_khoan);


--
-- Name: ky_danh_gia_kpi_ma_ky_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ky_danh_gia_kpi_ma_ky_key ON public.ky_danh_gia_kpi USING btree (ma_ky);


--
-- Name: lich_phan_ca_chi_tiet_ca_lam_viec_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lich_phan_ca_chi_tiet_ca_lam_viec_id_idx ON public.lich_phan_ca_chi_tiet USING btree (ca_lam_viec_id);


--
-- Name: lich_phan_ca_chi_tiet_lich_phan_ca_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lich_phan_ca_chi_tiet_lich_phan_ca_id_idx ON public.lich_phan_ca_chi_tiet USING btree (lich_phan_ca_id);


--
-- Name: lich_phan_ca_chi_tiet_ngay_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lich_phan_ca_chi_tiet_ngay_idx ON public.lich_phan_ca_chi_tiet USING btree (ngay);


--
-- Name: lich_phan_ca_chi_tiet_nhan_vien_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lich_phan_ca_chi_tiet_nhan_vien_id_idx ON public.lich_phan_ca_chi_tiet USING btree (nhan_vien_id);


--
-- Name: lich_phan_ca_chi_tiet_nhan_vien_id_ngay_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX lich_phan_ca_chi_tiet_nhan_vien_id_ngay_key ON public.lich_phan_ca_chi_tiet USING btree (nhan_vien_id, ngay);


--
-- Name: lich_phan_ca_nhom_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lich_phan_ca_nhom_id_idx ON public.lich_phan_ca USING btree (nhom_id);


--
-- Name: lich_phan_ca_phong_ban_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lich_phan_ca_phong_ban_id_idx ON public.lich_phan_ca USING btree (phong_ban_id);


--
-- Name: lich_phan_ca_thang_nam_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lich_phan_ca_thang_nam_idx ON public.lich_phan_ca USING btree (thang_nam);


--
-- Name: lich_phan_ca_thang_nam_phong_ban_id_nhom_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX lich_phan_ca_thang_nam_phong_ban_id_nhom_id_key ON public.lich_phan_ca USING btree (thang_nam, phong_ban_id, nhom_id);


--
-- Name: lich_phan_ca_trang_thai_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lich_phan_ca_trang_thai_idx ON public.lich_phan_ca USING btree (trang_thai);


--
-- Name: lich_su_import_import_luc_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lich_su_import_import_luc_idx ON public.lich_su_import USING btree (import_luc);


--
-- Name: lich_su_import_loai_import_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lich_su_import_loai_import_idx ON public.lich_su_import USING btree (loai_import);


--
-- Name: lich_su_import_ngay_du_lieu_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lich_su_import_ngay_du_lieu_idx ON public.lich_su_import USING btree (ngay_du_lieu);


--
-- Name: lich_su_import_nguoi_import_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lich_su_import_nguoi_import_id_idx ON public.lich_su_import USING btree (nguoi_import_id);


--
-- Name: lich_su_sua_cong_ngay_tao_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lich_su_sua_cong_ngay_tao_idx ON public.lich_su_sua_cong USING btree (ngay_tao);


--
-- Name: lich_su_sua_cong_nguon_thay_doi_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lich_su_sua_cong_nguon_thay_doi_idx ON public.lich_su_sua_cong USING btree (nguon_thay_doi);


--
-- Name: lich_su_sua_cong_nhan_vien_id_ngay_cham_cong_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lich_su_sua_cong_nhan_vien_id_ngay_cham_cong_idx ON public.lich_su_sua_cong USING btree (nhan_vien_id, ngay_cham_cong);


--
-- Name: lich_su_thiet_bi_hanh_dong_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lich_su_thiet_bi_hanh_dong_idx ON public.lich_su_thiet_bi USING btree (hanh_dong);


--
-- Name: lich_su_thiet_bi_ngay_tao_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lich_su_thiet_bi_ngay_tao_idx ON public.lich_su_thiet_bi USING btree (ngay_tao);


--
-- Name: lich_su_thiet_bi_nhan_vien_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lich_su_thiet_bi_nhan_vien_id_idx ON public.lich_su_thiet_bi USING btree (nhan_vien_id);


--
-- Name: ngay_cong_bang_luong_bang_luong_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ngay_cong_bang_luong_bang_luong_id_idx ON public.ngay_cong_bang_luong USING btree (bang_luong_id);


--
-- Name: ngay_cong_bang_luong_bang_luong_id_nhan_vien_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ngay_cong_bang_luong_bang_luong_id_nhan_vien_id_key ON public.ngay_cong_bang_luong USING btree (bang_luong_id, nhan_vien_id);


--
-- Name: ngay_cong_bang_luong_nhan_vien_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ngay_cong_bang_luong_nhan_vien_id_idx ON public.ngay_cong_bang_luong USING btree (nhan_vien_id);


--
-- Name: nguoi_dung_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX nguoi_dung_email_key ON public.nguoi_dung USING btree (email);


--
-- Name: nguoi_dung_nhan_vien_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX nguoi_dung_nhan_vien_id_key ON public.nguoi_dung USING btree (nhan_vien_id);


--
-- Name: nguoi_dung_ten_dang_nhap_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX nguoi_dung_ten_dang_nhap_key ON public.nguoi_dung USING btree (ten_dang_nhap);


--
-- Name: nguoi_dung_vai_tro_nguoi_dung_id_vai_tro_id_phong_ban_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX nguoi_dung_vai_tro_nguoi_dung_id_vai_tro_id_phong_ban_id_key ON public.nguoi_dung_vai_tro USING btree (nguoi_dung_id, vai_tro_id, phong_ban_id);


--
-- Name: nhan_vien_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX nhan_vien_email_key ON public.nhan_vien USING btree (email);


--
-- Name: nhan_vien_hop_dong_nhan_vien_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX nhan_vien_hop_dong_nhan_vien_id_idx ON public.nhan_vien_hop_dong USING btree (nhan_vien_id);


--
-- Name: nhan_vien_hop_dong_nhan_vien_id_tu_ngay_den_ngay_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX nhan_vien_hop_dong_nhan_vien_id_tu_ngay_den_ngay_idx ON public.nhan_vien_hop_dong USING btree (nhan_vien_id, tu_ngay, den_ngay);


--
-- Name: nhan_vien_hop_dong_trang_thai_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX nhan_vien_hop_dong_trang_thai_idx ON public.nhan_vien_hop_dong USING btree (trang_thai);


--
-- Name: nhan_vien_ma_nhan_vien_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX nhan_vien_ma_nhan_vien_key ON public.nhan_vien USING btree (ma_nhan_vien);


--
-- Name: nhan_vien_ngan_hang_nhan_vien_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX nhan_vien_ngan_hang_nhan_vien_id_idx ON public.nhan_vien_ngan_hang USING btree (nhan_vien_id);


--
-- Name: nhan_vien_ngan_hang_nhan_vien_id_la_mac_dinh_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX nhan_vien_ngan_hang_nhan_vien_id_la_mac_dinh_idx ON public.nhan_vien_ngan_hang USING btree (nhan_vien_id, la_mac_dinh);


--
-- Name: nhan_vien_phong_ban_nhan_vien_id_tu_ngay_den_ngay_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX nhan_vien_phong_ban_nhan_vien_id_tu_ngay_den_ngay_idx ON public.nhan_vien_phong_ban USING btree (nhan_vien_id, tu_ngay, den_ngay);


--
-- Name: nhan_vien_phong_ban_phong_ban_id_don_vi_con_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX nhan_vien_phong_ban_phong_ban_id_don_vi_con_id_idx ON public.nhan_vien_phong_ban USING btree (phong_ban_id, don_vi_con_id);


--
-- Name: nhan_vien_thue_bh_nhan_vien_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX nhan_vien_thue_bh_nhan_vien_id_key ON public.nhan_vien_thue_bh USING btree (nhan_vien_id);


--
-- Name: nhan_vien_thuoc_nhom_nhan_vien_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX nhan_vien_thuoc_nhom_nhan_vien_id_idx ON public.nhan_vien_thuoc_nhom USING btree (nhan_vien_id);


--
-- Name: nhan_vien_thuoc_nhom_nhan_vien_id_nhom_id_tu_ngay_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX nhan_vien_thuoc_nhom_nhan_vien_id_nhom_id_tu_ngay_key ON public.nhan_vien_thuoc_nhom USING btree (nhan_vien_id, nhom_id, tu_ngay);


--
-- Name: nhan_vien_thuoc_nhom_nhom_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX nhan_vien_thuoc_nhom_nhom_id_idx ON public.nhan_vien_thuoc_nhom USING btree (nhom_id);


--
-- Name: nhan_vien_trach_nhiem_nhan_vien_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX nhan_vien_trach_nhiem_nhan_vien_id_idx ON public.nhan_vien_trach_nhiem USING btree (nhan_vien_id);


--
-- Name: nhan_vien_trach_nhiem_phong_ban_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX nhan_vien_trach_nhiem_phong_ban_id_idx ON public.nhan_vien_trach_nhiem USING btree (phong_ban_id);


--
-- Name: nhan_vien_trach_nhiem_tu_ngay_den_ngay_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX nhan_vien_trach_nhiem_tu_ngay_den_ngay_idx ON public.nhan_vien_trach_nhiem USING btree (tu_ngay, den_ngay);


--
-- Name: nhom_nhan_vien_ma_nhom_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX nhom_nhan_vien_ma_nhom_key ON public.nhom_nhan_vien USING btree (ma_nhom);


--
-- Name: phan_quyen_phong_ban_nguoi_dung_id_phong_ban_id_quyen_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX phan_quyen_phong_ban_nguoi_dung_id_phong_ban_id_quyen_key ON public.phan_quyen_phong_ban USING btree (nguoi_dung_id, phong_ban_id, quyen);


--
-- Name: phien_dang_nhap_nguoi_dung_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX phien_dang_nhap_nguoi_dung_id_idx ON public.phien_dang_nhap USING btree (nguoi_dung_id);


--
-- Name: phien_dang_nhap_thoi_gian_het_han_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX phien_dang_nhap_thoi_gian_het_han_idx ON public.phien_dang_nhap USING btree (thoi_gian_het_han);


--
-- Name: phien_dang_nhap_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX phien_dang_nhap_token_key ON public.phien_dang_nhap USING btree (token);


--
-- Name: phieu_dieu_chinh_ma_phieu_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX phieu_dieu_chinh_ma_phieu_key ON public.phieu_dieu_chinh USING btree (ma_phieu);


--
-- Name: phong_ban_ma_phong_ban_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX phong_ban_ma_phong_ban_key ON public.phong_ban USING btree (ma_phong_ban);


--
-- Name: phong_ban_phong_ban_cha_id_cap_do_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX phong_ban_phong_ban_cha_id_cap_do_idx ON public.phong_ban USING btree (phong_ban_cha_id, cap_do);


--
-- Name: quy_che_phong_ban_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX quy_che_phong_ban_id_idx ON public.quy_che USING btree (phong_ban_id);


--
-- Name: quy_che_rule_khoan_luong_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX quy_che_rule_khoan_luong_id_idx ON public.quy_che_rule USING btree (khoan_luong_id);


--
-- Name: quy_che_rule_quy_che_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX quy_che_rule_quy_che_id_idx ON public.quy_che_rule USING btree (quy_che_id);


--
-- Name: quy_che_rule_thu_tu_uu_tien_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX quy_che_rule_thu_tu_uu_tien_idx ON public.quy_che_rule USING btree (thu_tu_uu_tien);


--
-- Name: quy_che_trang_thai_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX quy_che_trang_thai_idx ON public.quy_che USING btree (trang_thai);


--
-- Name: quy_che_tu_ngay_den_ngay_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX quy_che_tu_ngay_den_ngay_idx ON public.quy_che USING btree (tu_ngay, den_ngay);


--
-- Name: quyen_ma_quyen_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX quyen_ma_quyen_key ON public.quyen USING btree (ma_quyen);


--
-- Name: request_mapping_cham_cong_da_ap_dung_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX request_mapping_cham_cong_da_ap_dung_idx ON public.request_mapping_cham_cong USING btree (da_ap_dung);


--
-- Name: request_mapping_cham_cong_don_yeu_cau_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX request_mapping_cham_cong_don_yeu_cau_id_idx ON public.request_mapping_cham_cong USING btree (don_yeu_cau_id);


--
-- Name: request_mapping_cham_cong_don_yeu_cau_id_ngay_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX request_mapping_cham_cong_don_yeu_cau_id_ngay_key ON public.request_mapping_cham_cong USING btree (don_yeu_cau_id, ngay);


--
-- Name: request_mapping_cham_cong_nhan_vien_id_ngay_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX request_mapping_cham_cong_nhan_vien_id_ngay_idx ON public.request_mapping_cham_cong USING btree (nhan_vien_id, ngay);


--
-- Name: request_workflow_config_loai_yeu_cau_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX request_workflow_config_loai_yeu_cau_id_idx ON public.request_workflow_config USING btree (loai_yeu_cau_id);


--
-- Name: request_workflow_config_loai_yeu_cau_id_phong_ban_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX request_workflow_config_loai_yeu_cau_id_phong_ban_id_key ON public.request_workflow_config USING btree (loai_yeu_cau_id, phong_ban_id);


--
-- Name: request_workflow_config_phong_ban_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX request_workflow_config_phong_ban_id_idx ON public.request_workflow_config USING btree (phong_ban_id);


--
-- Name: rule_trace_bang_luong_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX rule_trace_bang_luong_id_idx ON public.rule_trace USING btree (bang_luong_id);


--
-- Name: rule_trace_bang_luong_id_nhan_vien_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX rule_trace_bang_luong_id_nhan_vien_id_idx ON public.rule_trace USING btree (bang_luong_id, nhan_vien_id);


--
-- Name: rule_trace_nhan_vien_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX rule_trace_nhan_vien_id_idx ON public.rule_trace USING btree (nhan_vien_id);


--
-- Name: rule_trace_quy_che_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX rule_trace_quy_che_id_idx ON public.rule_trace USING btree (quy_che_id);


--
-- Name: rule_trace_tao_luc_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX rule_trace_tao_luc_idx ON public.rule_trace USING btree (tao_luc);


--
-- Name: san_luong_chia_hang_import_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX san_luong_chia_hang_import_id_idx ON public.san_luong_chia_hang USING btree (import_id);


--
-- Name: san_luong_chia_hang_ngay_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX san_luong_chia_hang_ngay_idx ON public.san_luong_chia_hang USING btree (ngay);


--
-- Name: san_luong_chia_hang_ngay_nhan_vien_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX san_luong_chia_hang_ngay_nhan_vien_id_key ON public.san_luong_chia_hang USING btree (ngay, nhan_vien_id);


--
-- Name: san_luong_chia_hang_nhan_vien_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX san_luong_chia_hang_nhan_vien_id_idx ON public.san_luong_chia_hang USING btree (nhan_vien_id);


--
-- Name: snapshot_bang_luong_bang_luong_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX snapshot_bang_luong_bang_luong_id_idx ON public.snapshot_bang_luong USING btree (bang_luong_id);


--
-- Name: snapshot_bang_luong_bang_luong_id_nhan_vien_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX snapshot_bang_luong_bang_luong_id_nhan_vien_id_idx ON public.snapshot_bang_luong USING btree (bang_luong_id, nhan_vien_id);


--
-- Name: snapshot_bang_luong_nhan_vien_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX snapshot_bang_luong_nhan_vien_id_idx ON public.snapshot_bang_luong USING btree (nhan_vien_id);


--
-- Name: snapshot_bang_luong_phong_ban_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX snapshot_bang_luong_phong_ban_id_idx ON public.snapshot_bang_luong USING btree (phong_ban_id);


--
-- Name: snapshot_bang_ung_luong_bang_ung_luong_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX snapshot_bang_ung_luong_bang_ung_luong_id_idx ON public.snapshot_bang_ung_luong USING btree (bang_ung_luong_id);


--
-- Name: snapshot_chi_tiet_bang_ung_luong_nhan_vien_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX snapshot_chi_tiet_bang_ung_luong_nhan_vien_id_idx ON public.snapshot_chi_tiet_bang_ung_luong USING btree (nhan_vien_id);


--
-- Name: snapshot_chi_tiet_bang_ung_luong_snapshot_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX snapshot_chi_tiet_bang_ung_luong_snapshot_id_idx ON public.snapshot_chi_tiet_bang_ung_luong USING btree (snapshot_id);


--
-- Name: snapshot_giao_hang_bang_luong_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX snapshot_giao_hang_bang_luong_id_idx ON public.snapshot_giao_hang USING btree (bang_luong_id);


--
-- Name: snapshot_giao_hang_bang_luong_id_nhan_vien_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX snapshot_giao_hang_bang_luong_id_nhan_vien_id_key ON public.snapshot_giao_hang USING btree (bang_luong_id, nhan_vien_id);


--
-- Name: snapshot_giao_hang_nhan_vien_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX snapshot_giao_hang_nhan_vien_id_idx ON public.snapshot_giao_hang USING btree (nhan_vien_id);


--
-- Name: snapshot_san_luong_chia_hang_bang_luong_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX snapshot_san_luong_chia_hang_bang_luong_id_idx ON public.snapshot_san_luong_chia_hang USING btree (bang_luong_id);


--
-- Name: snapshot_san_luong_chia_hang_bang_luong_id_nhan_vien_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX snapshot_san_luong_chia_hang_bang_luong_id_nhan_vien_id_key ON public.snapshot_san_luong_chia_hang USING btree (bang_luong_id, nhan_vien_id);


--
-- Name: snapshot_san_luong_chia_hang_nhan_vien_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX snapshot_san_luong_chia_hang_nhan_vien_id_idx ON public.snapshot_san_luong_chia_hang USING btree (nhan_vien_id);


--
-- Name: su_kien_thuong_phat_loai_su_kien_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX su_kien_thuong_phat_loai_su_kien_idx ON public.su_kien_thuong_phat USING btree (loai_su_kien);


--
-- Name: su_kien_thuong_phat_ngay_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX su_kien_thuong_phat_ngay_idx ON public.su_kien_thuong_phat USING btree (ngay);


--
-- Name: su_kien_thuong_phat_nhan_vien_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX su_kien_thuong_phat_nhan_vien_id_idx ON public.su_kien_thuong_phat USING btree (nhan_vien_id);


--
-- Name: su_kien_thuong_phat_phong_ban_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX su_kien_thuong_phat_phong_ban_id_idx ON public.su_kien_thuong_phat USING btree (phong_ban_id);


--
-- Name: su_kien_thuong_phat_trang_thai_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX su_kien_thuong_phat_trang_thai_idx ON public.su_kien_thuong_phat USING btree (trang_thai);


--
-- Name: template_kpi_ma_template_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX template_kpi_ma_template_key ON public.template_kpi USING btree (ma_template);


--
-- Name: thiet_bi_nhan_vien_device_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX thiet_bi_nhan_vien_device_id_idx ON public.thiet_bi_nhan_vien USING btree (device_id);


--
-- Name: thiet_bi_nhan_vien_nhan_vien_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX thiet_bi_nhan_vien_nhan_vien_id_key ON public.thiet_bi_nhan_vien USING btree (nhan_vien_id);


--
-- Name: thiet_bi_nhan_vien_trang_thai_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX thiet_bi_nhan_vien_trang_thai_idx ON public.thiet_bi_nhan_vien USING btree (trang_thai);


--
-- Name: thong_bao_loai_thong_bao_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX thong_bao_loai_thong_bao_idx ON public.thong_bao USING btree (loai_thong_bao);


--
-- Name: thong_bao_nguoi_nhan_id_da_doc_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX thong_bao_nguoi_nhan_id_da_doc_idx ON public.thong_bao USING btree (nguoi_nhan_id, da_doc);


--
-- Name: thong_bao_nguoi_nhan_id_ngay_tao_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX thong_bao_nguoi_nhan_id_ngay_tao_idx ON public.thong_bao USING btree (nguoi_nhan_id, ngay_tao);


--
-- Name: vai_tro_ma_vai_tro_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX vai_tro_ma_vai_tro_key ON public.vai_tro USING btree (ma_vai_tro);


--
-- Name: vai_tro_quyen_vai_tro_id_quyen_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX vai_tro_quyen_vai_tro_id_quyen_id_key ON public.vai_tro_quyen USING btree (vai_tro_id, quyen_id);


--
-- Name: yeu_cau_sua_cong_ngay_cham_cong_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX yeu_cau_sua_cong_ngay_cham_cong_idx ON public.yeu_cau_sua_cong USING btree (ngay_cham_cong);


--
-- Name: yeu_cau_sua_cong_nguoi_tao_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX yeu_cau_sua_cong_nguoi_tao_id_idx ON public.yeu_cau_sua_cong USING btree (nguoi_tao_id);


--
-- Name: yeu_cau_sua_cong_nhan_vien_id_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX yeu_cau_sua_cong_nhan_vien_id_idx ON public.yeu_cau_sua_cong USING btree (nhan_vien_id);


--
-- Name: yeu_cau_sua_cong_trang_thai_duyet_idx; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX yeu_cau_sua_cong_trang_thai_duyet_idx ON public.yeu_cau_sua_cong USING btree (trang_thai_duyet);


--
-- Name: ai_rule_audit ai_rule_audit_nguoi_tao_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_rule_audit
    ADD CONSTRAINT ai_rule_audit_nguoi_tao_id_fkey FOREIGN KEY (nguoi_tao_id) REFERENCES public.nguoi_dung(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ai_rule_audit ai_rule_audit_phong_ban_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_rule_audit
    ADD CONSTRAINT ai_rule_audit_phong_ban_id_fkey FOREIGN KEY (phong_ban_id) REFERENCES public.phong_ban(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ai_rule_audit ai_rule_audit_quy_che_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_rule_audit
    ADD CONSTRAINT ai_rule_audit_quy_che_id_fkey FOREIGN KEY (quy_che_id) REFERENCES public.quy_che(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ai_rule_audit ai_rule_audit_rule_ap_dung_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ai_rule_audit
    ADD CONSTRAINT ai_rule_audit_rule_ap_dung_id_fkey FOREIGN KEY (rule_ap_dung_id) REFERENCES public.quy_che_rule(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: audit_log audit_log_nguoi_dung_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_log
    ADD CONSTRAINT audit_log_nguoi_dung_id_fkey FOREIGN KEY (nguoi_dung_id) REFERENCES public.nguoi_dung(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: audit_sua_du_lieu audit_sua_du_lieu_sua_boi_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit_sua_du_lieu
    ADD CONSTRAINT audit_sua_du_lieu_sua_boi_fkey FOREIGN KEY (sua_boi) REFERENCES public.nguoi_dung(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: bac_thue_tncn bac_thue_tncn_cau_hinh_thue_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bac_thue_tncn
    ADD CONSTRAINT bac_thue_tncn_cau_hinh_thue_id_fkey FOREIGN KEY (cau_hinh_thue_id) REFERENCES public.cau_hinh_thue_tncn(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: bang_ghi_cham_cong_gps bang_ghi_cham_cong_gps_geofence_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bang_ghi_cham_cong_gps
    ADD CONSTRAINT bang_ghi_cham_cong_gps_geofence_id_fkey FOREIGN KEY (geofence_id) REFERENCES public.cau_hinh_geofence(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: bang_luong bang_luong_phong_ban_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bang_luong
    ADD CONSTRAINT bang_luong_phong_ban_id_fkey FOREIGN KEY (phong_ban_id) REFERENCES public.phong_ban(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: bang_luong_quy_che bang_luong_quy_che_bang_luong_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bang_luong_quy_che
    ADD CONSTRAINT bang_luong_quy_che_bang_luong_id_fkey FOREIGN KEY (bang_luong_id) REFERENCES public.bang_luong(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: bang_luong_quy_che bang_luong_quy_che_quy_che_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bang_luong_quy_che
    ADD CONSTRAINT bang_luong_quy_che_quy_che_id_fkey FOREIGN KEY (quy_che_id) REFERENCES public.quy_che(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: bien_so_cong_thuc bien_so_cong_thuc_cong_thuc_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bien_so_cong_thuc
    ADD CONSTRAINT bien_so_cong_thuc_cong_thuc_id_fkey FOREIGN KEY (cong_thuc_id) REFERENCES public.cong_thuc_luong(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cau_hinh_don_gia cau_hinh_don_gia_phong_ban_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cau_hinh_don_gia
    ADD CONSTRAINT cau_hinh_don_gia_phong_ban_id_fkey FOREIGN KEY (phong_ban_id) REFERENCES public.phong_ban(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: cau_hinh_import_phong_ban cau_hinh_import_phong_ban_phong_ban_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cau_hinh_import_phong_ban
    ADD CONSTRAINT cau_hinh_import_phong_ban_phong_ban_id_fkey FOREIGN KEY (phong_ban_id) REFERENCES public.phong_ban(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: cham_cong cham_cong_nhan_vien_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cham_cong
    ADD CONSTRAINT cham_cong_nhan_vien_id_fkey FOREIGN KEY (nhan_vien_id) REFERENCES public.nhan_vien(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: chi_tiet_bang_luong chi_tiet_bang_luong_bang_luong_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chi_tiet_bang_luong
    ADD CONSTRAINT chi_tiet_bang_luong_bang_luong_id_fkey FOREIGN KEY (bang_luong_id) REFERENCES public.bang_luong(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: chi_tiet_bang_luong chi_tiet_bang_luong_khoan_luong_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chi_tiet_bang_luong
    ADD CONSTRAINT chi_tiet_bang_luong_khoan_luong_id_fkey FOREIGN KEY (khoan_luong_id) REFERENCES public.khoan_luong(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: chi_tiet_bang_luong chi_tiet_bang_luong_nhan_vien_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chi_tiet_bang_luong
    ADD CONSTRAINT chi_tiet_bang_luong_nhan_vien_id_fkey FOREIGN KEY (nhan_vien_id) REFERENCES public.nhan_vien(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: chi_tiet_bang_ung_luong chi_tiet_bang_ung_luong_bang_ung_luong_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chi_tiet_bang_ung_luong
    ADD CONSTRAINT chi_tiet_bang_ung_luong_bang_ung_luong_id_fkey FOREIGN KEY (bang_ung_luong_id) REFERENCES public.bang_ung_luong(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: chi_tiet_cham_cong chi_tiet_cham_cong_ca_lam_viec_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chi_tiet_cham_cong
    ADD CONSTRAINT chi_tiet_cham_cong_ca_lam_viec_id_fkey FOREIGN KEY (ca_lam_viec_id) REFERENCES public.ca_lam_viec(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: chi_tiet_nghi_phep_ngay chi_tiet_nghi_phep_ngay_don_nghi_phep_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chi_tiet_nghi_phep_ngay
    ADD CONSTRAINT chi_tiet_nghi_phep_ngay_don_nghi_phep_id_fkey FOREIGN KEY (don_nghi_phep_id) REFERENCES public.don_nghi_phep(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: chi_tiet_nghi_phep_ngay chi_tiet_nghi_phep_ngay_loai_nghi_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chi_tiet_nghi_phep_ngay
    ADD CONSTRAINT chi_tiet_nghi_phep_ngay_loai_nghi_id_fkey FOREIGN KEY (loai_nghi_id) REFERENCES public.danh_muc_loai_nghi(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: chi_tiet_nghi_phep_ngay chi_tiet_nghi_phep_ngay_nhan_vien_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chi_tiet_nghi_phep_ngay
    ADD CONSTRAINT chi_tiet_nghi_phep_ngay_nhan_vien_id_fkey FOREIGN KEY (nhan_vien_id) REFERENCES public.nhan_vien(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: chi_tiet_phieu_dieu_chinh chi_tiet_phieu_dieu_chinh_khoan_luong_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chi_tiet_phieu_dieu_chinh
    ADD CONSTRAINT chi_tiet_phieu_dieu_chinh_khoan_luong_id_fkey FOREIGN KEY (khoan_luong_id) REFERENCES public.khoan_luong(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: chi_tiet_phieu_dieu_chinh chi_tiet_phieu_dieu_chinh_phieu_dieu_chinh_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chi_tiet_phieu_dieu_chinh
    ADD CONSTRAINT chi_tiet_phieu_dieu_chinh_phieu_dieu_chinh_id_fkey FOREIGN KEY (phieu_dieu_chinh_id) REFERENCES public.phieu_dieu_chinh(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: chi_tieu_kpi chi_tieu_kpi_template_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chi_tieu_kpi
    ADD CONSTRAINT chi_tieu_kpi_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.template_kpi(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: co_cau_luong_chi_tiet co_cau_luong_chi_tiet_co_cau_luong_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.co_cau_luong_chi_tiet
    ADD CONSTRAINT co_cau_luong_chi_tiet_co_cau_luong_id_fkey FOREIGN KEY (co_cau_luong_id) REFERENCES public.co_cau_luong(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: co_cau_luong_chi_tiet co_cau_luong_chi_tiet_khoan_luong_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.co_cau_luong_chi_tiet
    ADD CONSTRAINT co_cau_luong_chi_tiet_khoan_luong_id_fkey FOREIGN KEY (khoan_luong_id) REFERENCES public.khoan_luong(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: co_cau_luong co_cau_luong_phong_ban_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.co_cau_luong
    ADD CONSTRAINT co_cau_luong_phong_ban_id_fkey FOREIGN KEY (phong_ban_id) REFERENCES public.phong_ban(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: danh_gia_kpi_nhan_vien danh_gia_kpi_nhan_vien_ky_danh_gia_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.danh_gia_kpi_nhan_vien
    ADD CONSTRAINT danh_gia_kpi_nhan_vien_ky_danh_gia_id_fkey FOREIGN KEY (ky_danh_gia_id) REFERENCES public.ky_danh_gia_kpi(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: don_nghi_phep don_nghi_phep_loai_nghi_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.don_nghi_phep
    ADD CONSTRAINT don_nghi_phep_loai_nghi_id_fkey FOREIGN KEY (loai_nghi_id) REFERENCES public.danh_muc_loai_nghi(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: don_nghi_phep don_nghi_phep_nguoi_duyet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.don_nghi_phep
    ADD CONSTRAINT don_nghi_phep_nguoi_duyet_id_fkey FOREIGN KEY (nguoi_duyet_id) REFERENCES public.nguoi_dung(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: don_nghi_phep don_nghi_phep_nhan_vien_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.don_nghi_phep
    ADD CONSTRAINT don_nghi_phep_nhan_vien_id_fkey FOREIGN KEY (nhan_vien_id) REFERENCES public.nhan_vien(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: don_nghi_phep don_nghi_phep_phong_ban_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.don_nghi_phep
    ADD CONSTRAINT don_nghi_phep_phong_ban_id_fkey FOREIGN KEY (phong_ban_id) REFERENCES public.phong_ban(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: don_vi_con don_vi_con_phong_ban_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.don_vi_con
    ADD CONSTRAINT don_vi_con_phong_ban_id_fkey FOREIGN KEY (phong_ban_id) REFERENCES public.phong_ban(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: don_yeu_cau don_yeu_cau_loai_yeu_cau_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.don_yeu_cau
    ADD CONSTRAINT don_yeu_cau_loai_yeu_cau_id_fkey FOREIGN KEY (loai_yeu_cau_id) REFERENCES public.danh_muc_loai_yeu_cau(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: don_yeu_cau don_yeu_cau_nguoi_duyet_1_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.don_yeu_cau
    ADD CONSTRAINT don_yeu_cau_nguoi_duyet_1_id_fkey FOREIGN KEY (nguoi_duyet_1_id) REFERENCES public.nguoi_dung(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: don_yeu_cau don_yeu_cau_nguoi_duyet_2_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.don_yeu_cau
    ADD CONSTRAINT don_yeu_cau_nguoi_duyet_2_id_fkey FOREIGN KEY (nguoi_duyet_2_id) REFERENCES public.nguoi_dung(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: don_yeu_cau don_yeu_cau_nguoi_override_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.don_yeu_cau
    ADD CONSTRAINT don_yeu_cau_nguoi_override_id_fkey FOREIGN KEY (nguoi_override_id) REFERENCES public.nguoi_dung(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: don_yeu_cau don_yeu_cau_nhan_vien_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.don_yeu_cau
    ADD CONSTRAINT don_yeu_cau_nhan_vien_id_fkey FOREIGN KEY (nhan_vien_id) REFERENCES public.nhan_vien(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: don_yeu_cau don_yeu_cau_phong_ban_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.don_yeu_cau
    ADD CONSTRAINT don_yeu_cau_phong_ban_id_fkey FOREIGN KEY (phong_ban_id) REFERENCES public.phong_ban(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: giao_hang giao_hang_import_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.giao_hang
    ADD CONSTRAINT giao_hang_import_id_fkey FOREIGN KEY (import_id) REFERENCES public.lich_su_import(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: giao_hang giao_hang_nhan_vien_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.giao_hang
    ADD CONSTRAINT giao_hang_nhan_vien_id_fkey FOREIGN KEY (nhan_vien_id) REFERENCES public.nhan_vien(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ket_qua_kpi ket_qua_kpi_chi_tieu_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ket_qua_kpi
    ADD CONSTRAINT ket_qua_kpi_chi_tieu_id_fkey FOREIGN KEY (chi_tieu_id) REFERENCES public.chi_tieu_kpi(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ket_qua_kpi ket_qua_kpi_danh_gia_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ket_qua_kpi
    ADD CONSTRAINT ket_qua_kpi_danh_gia_id_fkey FOREIGN KEY (danh_gia_id) REFERENCES public.danh_gia_kpi_nhan_vien(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: lich_phan_ca_chi_tiet lich_phan_ca_chi_tiet_ca_lam_viec_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lich_phan_ca_chi_tiet
    ADD CONSTRAINT lich_phan_ca_chi_tiet_ca_lam_viec_id_fkey FOREIGN KEY (ca_lam_viec_id) REFERENCES public.ca_lam_viec(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: lich_phan_ca_chi_tiet lich_phan_ca_chi_tiet_lich_phan_ca_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lich_phan_ca_chi_tiet
    ADD CONSTRAINT lich_phan_ca_chi_tiet_lich_phan_ca_id_fkey FOREIGN KEY (lich_phan_ca_id) REFERENCES public.lich_phan_ca(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: lich_su_chinh_sua lich_su_chinh_sua_khoan_luong_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lich_su_chinh_sua
    ADD CONSTRAINT lich_su_chinh_sua_khoan_luong_id_fkey FOREIGN KEY (khoan_luong_id) REFERENCES public.khoan_luong(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: lich_su_chinh_sua lich_su_chinh_sua_nhan_vien_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lich_su_chinh_sua
    ADD CONSTRAINT lich_su_chinh_sua_nhan_vien_id_fkey FOREIGN KEY (nhan_vien_id) REFERENCES public.nhan_vien(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: lich_su_import lich_su_import_nguoi_import_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lich_su_import
    ADD CONSTRAINT lich_su_import_nguoi_import_id_fkey FOREIGN KEY (nguoi_import_id) REFERENCES public.nguoi_dung(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ngay_cong_bang_luong ngay_cong_bang_luong_bang_luong_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ngay_cong_bang_luong
    ADD CONSTRAINT ngay_cong_bang_luong_bang_luong_id_fkey FOREIGN KEY (bang_luong_id) REFERENCES public.bang_luong(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ngay_cong_bang_luong ngay_cong_bang_luong_nhan_vien_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ngay_cong_bang_luong
    ADD CONSTRAINT ngay_cong_bang_luong_nhan_vien_id_fkey FOREIGN KEY (nhan_vien_id) REFERENCES public.nhan_vien(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: nguoi_dung_vai_tro nguoi_dung_vai_tro_nguoi_dung_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nguoi_dung_vai_tro
    ADD CONSTRAINT nguoi_dung_vai_tro_nguoi_dung_id_fkey FOREIGN KEY (nguoi_dung_id) REFERENCES public.nguoi_dung(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: nguoi_dung_vai_tro nguoi_dung_vai_tro_vai_tro_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nguoi_dung_vai_tro
    ADD CONSTRAINT nguoi_dung_vai_tro_vai_tro_id_fkey FOREIGN KEY (vai_tro_id) REFERENCES public.vai_tro(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: nguoi_phu_thuoc nguoi_phu_thuoc_nhan_vien_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nguoi_phu_thuoc
    ADD CONSTRAINT nguoi_phu_thuoc_nhan_vien_id_fkey FOREIGN KEY (nhan_vien_id) REFERENCES public.nhan_vien(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: nhan_vien_hop_dong nhan_vien_hop_dong_nhan_vien_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien_hop_dong
    ADD CONSTRAINT nhan_vien_hop_dong_nhan_vien_id_fkey FOREIGN KEY (nhan_vien_id) REFERENCES public.nhan_vien(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: nhan_vien_ngan_hang nhan_vien_ngan_hang_nhan_vien_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien_ngan_hang
    ADD CONSTRAINT nhan_vien_ngan_hang_nhan_vien_id_fkey FOREIGN KEY (nhan_vien_id) REFERENCES public.nhan_vien(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: nhan_vien_phong_ban nhan_vien_phong_ban_don_vi_con_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien_phong_ban
    ADD CONSTRAINT nhan_vien_phong_ban_don_vi_con_id_fkey FOREIGN KEY (don_vi_con_id) REFERENCES public.don_vi_con(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: nhan_vien nhan_vien_phong_ban_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien
    ADD CONSTRAINT nhan_vien_phong_ban_id_fkey FOREIGN KEY (phong_ban_id) REFERENCES public.phong_ban(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: nhan_vien_phong_ban nhan_vien_phong_ban_nhan_vien_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien_phong_ban
    ADD CONSTRAINT nhan_vien_phong_ban_nhan_vien_id_fkey FOREIGN KEY (nhan_vien_id) REFERENCES public.nhan_vien(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: nhan_vien_phong_ban nhan_vien_phong_ban_phong_ban_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien_phong_ban
    ADD CONSTRAINT nhan_vien_phong_ban_phong_ban_id_fkey FOREIGN KEY (phong_ban_id) REFERENCES public.phong_ban(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: nhan_vien_thue_bh nhan_vien_thue_bh_nhan_vien_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien_thue_bh
    ADD CONSTRAINT nhan_vien_thue_bh_nhan_vien_id_fkey FOREIGN KEY (nhan_vien_id) REFERENCES public.nhan_vien(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: nhan_vien_thuoc_nhom nhan_vien_thuoc_nhom_nhan_vien_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien_thuoc_nhom
    ADD CONSTRAINT nhan_vien_thuoc_nhom_nhan_vien_id_fkey FOREIGN KEY (nhan_vien_id) REFERENCES public.nhan_vien(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: nhan_vien_thuoc_nhom nhan_vien_thuoc_nhom_nhom_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien_thuoc_nhom
    ADD CONSTRAINT nhan_vien_thuoc_nhom_nhom_id_fkey FOREIGN KEY (nhom_id) REFERENCES public.nhom_nhan_vien(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: nhan_vien_trach_nhiem nhan_vien_trach_nhiem_nhan_vien_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien_trach_nhiem
    ADD CONSTRAINT nhan_vien_trach_nhiem_nhan_vien_id_fkey FOREIGN KEY (nhan_vien_id) REFERENCES public.nhan_vien(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: nhan_vien_trach_nhiem nhan_vien_trach_nhiem_phong_ban_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.nhan_vien_trach_nhiem
    ADD CONSTRAINT nhan_vien_trach_nhiem_phong_ban_id_fkey FOREIGN KEY (phong_ban_id) REFERENCES public.phong_ban(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: phan_quyen_phong_ban phan_quyen_phong_ban_phong_ban_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phan_quyen_phong_ban
    ADD CONSTRAINT phan_quyen_phong_ban_phong_ban_id_fkey FOREIGN KEY (phong_ban_id) REFERENCES public.phong_ban(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: phien_dang_nhap phien_dang_nhap_nguoi_dung_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phien_dang_nhap
    ADD CONSTRAINT phien_dang_nhap_nguoi_dung_id_fkey FOREIGN KEY (nguoi_dung_id) REFERENCES public.nguoi_dung(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: phieu_dieu_chinh phieu_dieu_chinh_nhan_vien_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phieu_dieu_chinh
    ADD CONSTRAINT phieu_dieu_chinh_nhan_vien_id_fkey FOREIGN KEY (nhan_vien_id) REFERENCES public.nhan_vien(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: phong_ban phong_ban_phong_ban_cha_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phong_ban
    ADD CONSTRAINT phong_ban_phong_ban_cha_id_fkey FOREIGN KEY (phong_ban_cha_id) REFERENCES public.phong_ban(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: phu_cap_nhan_vien phu_cap_nhan_vien_khoan_luong_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phu_cap_nhan_vien
    ADD CONSTRAINT phu_cap_nhan_vien_khoan_luong_id_fkey FOREIGN KEY (khoan_luong_id) REFERENCES public.khoan_luong(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: phu_cap_nhan_vien phu_cap_nhan_vien_nhan_vien_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.phu_cap_nhan_vien
    ADD CONSTRAINT phu_cap_nhan_vien_nhan_vien_id_fkey FOREIGN KEY (nhan_vien_id) REFERENCES public.nhan_vien(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: quy_che quy_che_phong_ban_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quy_che
    ADD CONSTRAINT quy_che_phong_ban_id_fkey FOREIGN KEY (phong_ban_id) REFERENCES public.phong_ban(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: quy_che_rule quy_che_rule_khoan_luong_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quy_che_rule
    ADD CONSTRAINT quy_che_rule_khoan_luong_id_fkey FOREIGN KEY (khoan_luong_id) REFERENCES public.khoan_luong(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: quy_che_rule quy_che_rule_quy_che_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.quy_che_rule
    ADD CONSTRAINT quy_che_rule_quy_che_id_fkey FOREIGN KEY (quy_che_id) REFERENCES public.quy_che(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: request_mapping_cham_cong request_mapping_cham_cong_don_yeu_cau_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_mapping_cham_cong
    ADD CONSTRAINT request_mapping_cham_cong_don_yeu_cau_id_fkey FOREIGN KEY (don_yeu_cau_id) REFERENCES public.don_yeu_cau(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: request_workflow_config request_workflow_config_loai_yeu_cau_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.request_workflow_config
    ADD CONSTRAINT request_workflow_config_loai_yeu_cau_id_fkey FOREIGN KEY (loai_yeu_cau_id) REFERENCES public.danh_muc_loai_yeu_cau(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: rule_trace rule_trace_bang_luong_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rule_trace
    ADD CONSTRAINT rule_trace_bang_luong_id_fkey FOREIGN KEY (bang_luong_id) REFERENCES public.bang_luong(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: rule_trace rule_trace_khoan_luong_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rule_trace
    ADD CONSTRAINT rule_trace_khoan_luong_id_fkey FOREIGN KEY (khoan_luong_id) REFERENCES public.khoan_luong(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: rule_trace rule_trace_nhan_vien_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rule_trace
    ADD CONSTRAINT rule_trace_nhan_vien_id_fkey FOREIGN KEY (nhan_vien_id) REFERENCES public.nhan_vien(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: rule_trace rule_trace_quy_che_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rule_trace
    ADD CONSTRAINT rule_trace_quy_che_id_fkey FOREIGN KEY (quy_che_id) REFERENCES public.quy_che(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: rule_trace rule_trace_quy_che_rule_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rule_trace
    ADD CONSTRAINT rule_trace_quy_che_rule_id_fkey FOREIGN KEY (quy_che_rule_id) REFERENCES public.quy_che_rule(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: san_luong_chia_hang san_luong_chia_hang_import_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.san_luong_chia_hang
    ADD CONSTRAINT san_luong_chia_hang_import_id_fkey FOREIGN KEY (import_id) REFERENCES public.lich_su_import(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: san_luong_chia_hang san_luong_chia_hang_nhan_vien_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.san_luong_chia_hang
    ADD CONSTRAINT san_luong_chia_hang_nhan_vien_id_fkey FOREIGN KEY (nhan_vien_id) REFERENCES public.nhan_vien(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: snapshot_bang_ung_luong snapshot_bang_ung_luong_bang_ung_luong_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snapshot_bang_ung_luong
    ADD CONSTRAINT snapshot_bang_ung_luong_bang_ung_luong_id_fkey FOREIGN KEY (bang_ung_luong_id) REFERENCES public.bang_ung_luong(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: snapshot_chi_tiet_bang_ung_luong snapshot_chi_tiet_bang_ung_luong_snapshot_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snapshot_chi_tiet_bang_ung_luong
    ADD CONSTRAINT snapshot_chi_tiet_bang_ung_luong_snapshot_id_fkey FOREIGN KEY (snapshot_id) REFERENCES public.snapshot_bang_ung_luong(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: snapshot_giao_hang snapshot_giao_hang_bang_luong_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snapshot_giao_hang
    ADD CONSTRAINT snapshot_giao_hang_bang_luong_id_fkey FOREIGN KEY (bang_luong_id) REFERENCES public.bang_luong(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: snapshot_san_luong_chia_hang snapshot_san_luong_chia_hang_bang_luong_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.snapshot_san_luong_chia_hang
    ADD CONSTRAINT snapshot_san_luong_chia_hang_bang_luong_id_fkey FOREIGN KEY (bang_luong_id) REFERENCES public.bang_luong(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: su_kien_thuong_phat su_kien_thuong_phat_nhan_vien_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.su_kien_thuong_phat
    ADD CONSTRAINT su_kien_thuong_phat_nhan_vien_id_fkey FOREIGN KEY (nhan_vien_id) REFERENCES public.nhan_vien(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: su_kien_thuong_phat su_kien_thuong_phat_phong_ban_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.su_kien_thuong_phat
    ADD CONSTRAINT su_kien_thuong_phat_phong_ban_id_fkey FOREIGN KEY (phong_ban_id) REFERENCES public.phong_ban(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: thong_bao thong_bao_nguoi_nhan_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thong_bao
    ADD CONSTRAINT thong_bao_nguoi_nhan_id_fkey FOREIGN KEY (nguoi_nhan_id) REFERENCES public.nguoi_dung(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vai_tro_quyen vai_tro_quyen_quyen_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vai_tro_quyen
    ADD CONSTRAINT vai_tro_quyen_quyen_id_fkey FOREIGN KEY (quyen_id) REFERENCES public.quyen(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: vai_tro_quyen vai_tro_quyen_vai_tro_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vai_tro_quyen
    ADD CONSTRAINT vai_tro_quyen_vai_tro_id_fkey FOREIGN KEY (vai_tro_id) REFERENCES public.vai_tro(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict fIpRLhK1UEoZyhadtzYK28XjSHBtQVoiJIAfy0ijdCzUAAL7zi8jnefdkSUxXP3

