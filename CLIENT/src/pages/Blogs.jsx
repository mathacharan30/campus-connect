import { Blog } from "../components/Blog";
import { Loading } from "../components/Loading";
import { useState, useEffect } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import PageContainer from "../components/ui/PageContainer";
import SectionHeader from "../components/ui/SectionHeader";
import PrimaryButton from "../components/ui/PrimaryButton";
export const Blogs = () => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
const navigate =useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/blogs/viewBlogs');  
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    if (error) return <p className="text-center text-red-400 py-10">Error: {error.message}</p>;
    if (loading) return <Loading />;

    return (
      <PageContainer>
        <SectionHeader
          title="Placement Blogs"
          subtitle="Read alumni experiences and interview tips"
          actions={
            <PrimaryButton onClick={() => navigate('/uploadblogs')}>
              Write a Blog
            </PrimaryButton>
          }
        />

        {(!data || data.length === 0) ? (
          <div className="text-center text-gray-400 py-16">
            No blogs yet. Be the first to share your experience!
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.map((blog, index) => (
              <Blog key={index} data={blog} />
            ))}
          </div>
        )}
      </PageContainer>
    )
}