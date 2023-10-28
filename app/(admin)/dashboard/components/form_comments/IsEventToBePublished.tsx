export default function IsEventToBePublished() {
  return (
    <div className="prose">
      <p>
        Gdy pole jest <b>zaznaczone</b>: <br /> wydarzenie pojawi się na stronie
        we wszystkich, wybranych w dalszej części formularza, miejscach.
      </p>
      <p>
        Gdy pole jest <b>odznaczone</b>
        <br />
        wydarzenie będzie zapisane w bazie danych, lecz nie będzie widoczne na
        stronie www.
      </p>
    </div>
  );
}
