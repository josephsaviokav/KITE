import "../css/Contact.css";

export default function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-card">
        <img
          src="https://avatars.githubusercontent.com/josephsaviokav" // Replace with your actual GitHub avatar URL if preferred
          alt="GitHub Avatar"
          className="contact-avatar"
        />
        <h2>Joseph Savio</h2>
        <p>React Developer | Tech Enthusiast</p>
        <a
          href="https://github.com/josephsaviokav"
          target="_blank"
         
          className="contact-button"
        >
          Visit GitHub Profile
        </a>
      </div>
    </div>
  );
}
