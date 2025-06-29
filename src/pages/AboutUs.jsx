import AboutUsImg from "../assets/other-images/about-post.jpg";

function AboutUs() {
  return (
    <div className="min-h-[calc(100vh-8rem)]">
      {/* Hero Section with Background Image */}
      <div
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${AboutUsImg})` }}
        data-aos="fade-up"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div
            className="max-w-4xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About SuturaHub
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Your premier destination for authentic African fashion
            </p>
            <div className="w-24 h-1 bg-blue-500 mx-auto"></div>
          </div>
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Our Story */}
          <div
            className="bg-white rounded-xl shadow-sm p-8 mb-8"
            data-aos="fade-up"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Story
            </h2>
            <p className="text-gray-600 mb-4">
              SuturaHub was founded with a vision to enable local Ghanaian
              designers to bring authentic African fashion to the global stage.
              We believe in preserving cultural heritage while embracing modern
              design sensibilities.
            </p>
            <p className="text-gray-600">
              Our platform connects talented Ghanaian designers with fashion
              enthusiasts, creating a marketplace where tradition meets
              contemporary style.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div
              className="bg-white p-6 rounded-xl shadow-sm text-center"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="text-blue-500 mb-4">
                <i className="fas fa-heart text-3xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Passion
              </h3>
              <p className="text-gray-600">
                Dedicated to quality and authenticity
              </p>
            </div>

            <div
              className="bg-white p-6 rounded-xl shadow-sm text-center"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="text-blue-500 mb-4">
                <i className="fas fa-handshake text-3xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Trust
              </h3>
              <p className="text-gray-600">Building lasting relationships</p>
            </div>

            <div
              className="bg-white p-6 rounded-xl shadow-sm text-center"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="text-blue-500 mb-4">
                <i className="fas fa-globe-africa text-3xl"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Culture
              </h3>
              <p className="text-gray-600">Celebrating African heritage</p>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center" data-aos="fade-up">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">
              Our Team
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Ashira de Youngster", role: "Co-Founder & CEO" },
                { name: "Adelle. S. Hammond", role: "Creative Director" },
                {
                  name: "Joshua Adjei",
                  role: "Chief Technical Officer",
                  image: "src/assets/team-members-photos/joe.jpg",
                },
                { name: "Nathaniel Hotonu", role: "Chief Marketing Officer" },
                { name: "Gordon Armah", role: "Chief Marketing Officer" },
                {
                  name: "Issoufou Raaya Rahanatou",
                  role: "Chief Marketing Officer",
                },
                { name: "Gabriel Opoku", role: "Chief Marketing Officer" },
                {
                  name: "Kifayatu Hamza",
                  role: "Sales Personnel",
                  image: "src/assets/team-members-photos/kifaya.jpg",
                },
                { name: "Aaron. G. Essis", role: "Chief Marketing Officer" },
                { name: "David Surname", role: "Chief Marketing Officer" },
                { name: "Ajah Surname", role: "Chief Marketing Officer" },
                { name: "Ajack Surname", role: "Chief Marketing Officer" },
              ].map((member, index) => (
                <div
                  key={member.name}
                  className="bg-white p-4 rounded-xl shadow-sm"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-gray-100 shadow-lg">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <i className="fas fa-user text-3xl text-gray-400"></i>
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
