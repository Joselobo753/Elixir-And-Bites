import Footer from "../../components/common/Footer/Footer";
import Header from "../../components/common/Header/Header";
import ContactForm from "../../components/Contact/ContactForm";

const ContactView = () => {
  return (
    <>
    <Header/>
    <div className="container d-flex flex-column align-items-center text-center px-3">
      <div className="justify-content-center w-100">
        <ContactForm />
      </div>
    </div>
    <Footer/>
    </>
  );
};
export default ContactView;