// Import Link jika Anda menggunakan navigasi dengan react-router-dom
import { Link } from 'react-router-dom';

const FeaturedTours = ({ tours }) => {
    return (
        <section className="featured-tours mt-8">
            <h2 className="text-3xl text-center font-bold mb-6">Featured Destinations</h2>
            <div className="grid">
                {tours.map((tour) => (
                    <div key={tour.id} className="card">
                        <img src={`${process.env.REACT_APP_BASE_URL}/${tour.image.replace(/\\/g, '/')}`} alt={tour.name} />
                        <div className="content">
                            <div className="title">{tour.name}</div>
                            <p className="description">{tour.description}</p>
                            <Link to={`/tour/${tour.id}`} className="learn-more-btn">Learn More</Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};


export default FeaturedTours; // Pastikan ini ada
