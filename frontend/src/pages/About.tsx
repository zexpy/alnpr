const About = () => {
  return (
    <div className="w-full max-h-screen md:pl-48 py-8 px-10">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-3 text-start drop-shadow-md">
        ALNPR System
      </h1>
      <p className="text-base md:text-lg text-gray-700 mb-8  max-w-7xl leading-normal">
        Welcome to Automatic License Number Plate Recognition (ALNPR) where
        cutting-edge technology meets practicality. Our ALNPR system is designed
        to revolutionize vehicle identification and monitoring with unparalleled
        precision.
      </p>
      <h2 className="text-3xl font-semibold text-gray-700 mb-3 md:mb-6 text-start">
        Our Mission
      </h2>
      <p className="text-base md:text-lg text-gray-700 mb-8  max-w-7xl leading-relaxed">
        At the heart of our ALNPR system is a mission to enhance safety and
        efficiency on the roads. By leveraging advanced image processing and
        machine learning techniques, we aim to provide a seamless and reliable
        solution for various applications.
      </p>
      <h2 className="text-3xl font-semibold text-gray-700 mb-3 md:mb-6 text-start">
        Why Choose Us?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8  max-w-7xl">
        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <h3 className="text-xl font-bold text-gray-600 mb-2">
            Precision and Accuracy
          </h3>
          <p className="text-gray-600 text-base md:text-lg">
            Our system ensures high accuracy in recognizing number plates, even
            in challenging conditions such as low light or bad weather.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <h3 className="text-lg font-bold text-gray-600 mb-2">
            Real-Time Processing
          </h3>
          <p className="text-gray-600 text-sm md:text-base">
            With real-time processing capabilities, our ALNPR system can quickly
            identify and record vehicle information, making it ideal for dynamic
            environments.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <h3 className="text-lg font-bold text-gray-600 mb-2">
            Scalable Architecture
          </h3>
          <p className="text-gray-600 text-sm md:text-base">
            Built with scalability in mind, our system can handle a large volume
            of data and can be easily integrated with existing infrastructure.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            User-Friendly Interface
          </h3>
          <p className="text-gray-700 text-sm md:text-base">
            Our intuitive interface allows users to easily manage and monitor
            the system, providing comprehensive insights at a glance.
          </p>
        </div>
      </div>
      <h2 className="text-3xl font-semibold text-gray-700 mb-3 md:mb-6 text-start">
        Technology Stack
      </h2>
      <p className="text-gray-700 mb-8  max-w-7xl leading-relaxed text-base md:text-lg">
        The ALNPR system is powered by a robust technology stack that ensures
        reliability and performance:
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-8  max-w-7xl">
        <li>
          <strong>Frontend:</strong> React and Tailwind CSS for a responsive and
          interactive user experience.
        </li>
        <li>
          <strong>Backend:</strong> Node.js and Express for handling server-side
          logic and API requests.
        </li>
        <li>
          <strong>Database:</strong> MongoDB for efficient storage and retrieval
          of vehicle data.
        </li>
        <li>
          <strong>Image Processing:</strong> OpenCV and Tesseract.js for precise
          number plate detection and recognition.
        </li>
      </ul>

      <h2 className="text-3xl font-semibold text-gray-700 mb-3 md:mb-6 text-start">
        Get in Touch
      </h2>
      <p className="text-gray-700 text-start pb-6 text-base md:text-lg">
        We'd love to hear from you! Whether you have questions, feedback, or
        just want to say hello, reach out to us at{" "}
        <a href="./Team" className="text-blue-600 underline">
          Our Team
        </a>
        .
      </p>
    </div>
  );
};

export default About;
