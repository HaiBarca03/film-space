import React from 'react'
import './Footer.css'
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo và Giới thiệu */}
        <div className="footer-section">
          <h3 className="footer-logo">
            <span role="img" aria-label="movie">🎬</span> FilmSpace
          </h3>
          <p>
            FilmSpace là nền tảng xem phim trực tuyến hàng đầu do DucHai tạo
            nên, cung cấp các bộ phim mới nhất và chất lượng cao. Hãy cùng khám
            phá thế giới điện ảnh với chúng tôi!
          </p>
        </div>

        {/* Liên kết nhanh */}
        <div className="footer-section">
          <h4>Liên kết nhanh</h4>
          <ul>
            <li>
              <a href="/">Trang chủ</a>
            </li>
            <li>
              <a href="/phim-moi">Phim mới</a>
            </li>
            <li>
              <a href="/the-loai/hanh-dong">Hành động</a>
            </li>
            <li>
              <a href="/the-loai/hoat-hinh">Hoạt hình</a>
            </li>
          </ul>
        </div>

        {/* Thông tin liên hệ */}
        <div className="footer-section">
          <h4>Thông tin liên hệ</h4>
          <p>Email: support@phimhay.com</p>
          <p>Hotline: 0123 456 789</p>
          <p>Địa chỉ: 123 Đường 456, Quận 789, TP 10</p>
        </div>

        {/* Mạng xã hội */}
        <div className="footer-section">
          <h4>Kết nối với chúng tôi</h4>
          <div className="social-links">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-btn"
            >
              f
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-btn"
            >
              t
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-btn"
            >
              ig
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link-btn"
            >
              yt
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 FilmSpace by DucHai. Tất cả quyền được bảo lưu.</p>
      </div>
    </footer>
  )
}

export default Footer
