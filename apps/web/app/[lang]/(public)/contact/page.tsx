import ContactForm from "@/molecules/contact-form/contact-form"
import PageTitle from "@/molecules/page-title"

export default async function ContactUs() {
  return (
    <div className="grid w-full">
      <PageTitle
        title="Contact us"
        description="Contact us"
      />

      <ContactForm />
    </div>
  )
}
