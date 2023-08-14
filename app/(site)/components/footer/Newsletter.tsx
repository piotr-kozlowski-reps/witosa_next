import NewsletterForm from './NewsletterForm';

export default function NewsLetter() {
  return (
    <div className="w-full prose">
      <h4>Neswsletter ART CK</h4>
      <div className="mt-[23px]">
        <p className="mt-1">
          Aby otrzymywać aktualną ofertę programową, informacje o promocjach i
          darmowych wejściówkach - zapisz się do newslettera ART CK!
        </p>
      </div>
      <div className="mt-[15px]">
        <NewsletterForm />
      </div>
    </div>
  );
}
