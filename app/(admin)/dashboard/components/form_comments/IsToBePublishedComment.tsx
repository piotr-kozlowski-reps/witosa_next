export default function IsToBePublishedComment() {
  return (
    <div className="prose">
      <p>
        Gdy pole jest <b>zaznaczone</b>: <br /> zajęcia będą wyświetlały się na
        stronie internetowej.
      </p>
      <p>
        Gdy pole jest <b>odznaczone</b>: zajęcia będą zapisane w bazie danych,
        lecz nie będą widoczne dla odbiorców strony.
      </p>
    </div>
  );
}
