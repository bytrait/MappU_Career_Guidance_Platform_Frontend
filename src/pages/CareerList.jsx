import React, { useEffect, useState } from "react";
import { fetchCareerTitles } from "../services/careerService";
import { useNavigate } from "react-router-dom";
import CareerCard from "../components/career/CareerCard";
import Pagination from "../components/Pagination";

const CareerList = () => {
  const [careers, setCareers] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 20;

  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadCareers(page);
  }, [page]);

  const loadCareers = async (pageNumber) => {
    const data = await fetchCareerTitles(pageNumber, limit);

    setCareers(data.data);
    setTotal(data.total);
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Careers</h2>

      <div style={{ marginTop: "20px" }}>
        {careers.map((career) => (
          <CareerCard
            key={career.id}
            career={career}
            onClick={() => navigate(`/careers/${career.id}`)}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination 
          page={page} 
          totalPages={totalPages} 
          onPageChange={(newPage) => setPage(newPage)} 
        />
      )}

    </div>
  );
};

export default CareerList;
