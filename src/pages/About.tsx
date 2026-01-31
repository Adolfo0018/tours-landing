const About = () => {
  return (
    <section id="about" className="py-5 bg-white">
      <div className="container">

        <div className="row justify-content-center text-center mb-4">
          <div className="col-lg-8">
            <h2 className="fw-bold">About Us</h2>

            <p className="text-muted mt-3">
              We are local guides from Yucatán passionate about sharing the
              natural beauty and cultural heritage of our region.
            </p>
          </div>
        </div>

        <div className="row text-center g-4">

          <div className="col-md-4">
            <h5>🌿 Local Experience</h5>
            <p className="text-muted">
              Authentic tours guided by locals who know every corner of Yucatán.
            </p>
          </div>

          <div className="col-md-4">
            <h5>💧 Cenotes & Nature</h5>
            <p className="text-muted">
              Discover cenotes, jungles and hidden gems in small groups.
            </p>
          </div>

          <div className="col-md-4">
            <h5>🛡️ Safe & Professional</h5>
            <p className="text-muted">
              Certified guides, comfortable transportation and personalized
              attention.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;