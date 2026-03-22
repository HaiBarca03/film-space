import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './component/Header'
import MovieDetail from './page/MovieDetail'
import HomePage from './page/HomePage'
import Footer from './component/Footer'

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [currentFilter, setCurrentFilter] = useState(null) // Lưu trạng thái lọc hiện tại

  const fetchDefaultMovies = async (page = 1) => {
    setIsLoading(true)
    setError(null)
    setIsSearching(false)
    setCurrentFilter(null)
    try {
      const response = await fetch(
        `https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=${page}`
      )
      const data = await response.json()
      setMovies(data.items || [])
      setHasMore(data.items?.length === 10) // Giả sử API trả về 20 phim mỗi trang
    } catch (err) {
      setError('Không thể tải danh sách phim.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!currentFilter) {
      fetchDefaultMovies(currentPage)
    } else {
      currentFilter.func(currentFilter.slug, currentPage)
    }
  }, [currentPage])

  const handleSearch = async (keyword, page = 1) => {
    setIsLoading(true)
    setIsSearching(true)
    setError(null)
    setCurrentPage(page)
    setCurrentFilter({ type: 'search', func: handleSearch, slug: keyword })
    try {
      const response = await fetch(
        `https://phimapi.com/v1/api/tim-kiem?keyword=${encodeURIComponent(
          keyword
        )}&page=${page}`
      )
      const data = await response.json()
      setMovies(data.data?.items || [])
      setHasMore(data.data?.items?.length === 10)
    } catch (err) {
      setError('Không thể tìm phim.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterCategory = async (slug, page = 1) => {
    setIsLoading(true)
    setIsSearching(true)
    setError(null)
    setCurrentPage(page)
    setCurrentFilter({ type: 'category', func: handleFilterCategory, slug })
    try {
      const response = await fetch(
        `https://phimapi.com/v1/api/danh-sach/${slug}?page=${page}`
      )
      const data = await response.json()
      setMovies(data.data.items || [])
      setHasMore(data.data.items?.length === 10)
    } catch (err) {
      setError('Không thể lọc phim.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterTypeCategory = async (slug, page = 1) => {
    setIsLoading(true)
    setIsSearching(true)
    setError(null)
    setCurrentPage(page)
    setCurrentFilter({ type: 'type', func: handleFilterTypeCategory, slug })
    try {
      const response = await fetch(
        `https://phimapi.com/v1/api/the-loai/${slug}?page=${page}`
      )
      const data = await response.json()
      setMovies(data.data.items || [])
      setHasMore(data.data.items?.length === 10)
    } catch (err) {
      setError('Không thể lọc phim.')
    } finally {
      setIsLoading(false)
    }
  }

  // const handleFilterType18Category = async (slug, page = 1) => {
  //   setIsLoading(true)
  //   setIsSearching(true)
  //   setError(null)
  //   setCurrentPage(page)
  //   setCurrentFilter({ type: 'type18', func: handleFilterType18Category, slug })
  //   try {
  //     const response = await fetch(
  //       `https://phimapi.com/v1/api/the-loai/${slug}?page=${page}`
  //     )
  //     const data = await response.json()
  //     setMovies(data.data.items || [])
  //     setHasMore(data.data.items?.length === 10)
  //   } catch (err) {
  //     setError('Không thể lọc phim.')
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const handleNextPage = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  return (
    <Router>
      <Header
        onSearch={handleSearch}
        onFilter={handleFilterCategory}
        onFilterType={handleFilterTypeCategory}
        // onFilter18Type={handleFilterType18Category}
        onLogoClick={() => {
          setCurrentPage(1)
          fetchDefaultMovies(1)
        }}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              movies={movies}
              isLoading={isLoading}
              error={error}
              isSearching={isSearching}
              onReset={() => {
                setCurrentPage(1)
                fetchDefaultMovies(1)
              }}
              currentPage={currentPage}
              hasMore={hasMore}
              onNextPage={handleNextPage}
              onPrevPage={handlePrevPage}
            />
          }
        />
        <Route path="/phim/:slug" element={<MovieDetail />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
