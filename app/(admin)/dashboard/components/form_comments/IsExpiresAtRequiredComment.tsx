export default function IsExpiresAtRequiredComment() {
  return (
    <div className="prose">
      <p>
        Gdy pole jest <b>odznaczone</b> (zarazem data nie jest określona):
        <br />
        zajęcia będą widoczne na stronie internetowej bez ograniczeń czasowych.
      </p>
      <p>
        Gdy pole jest <b>zaznaczone</b>: <br /> należy podać datę, po której
        automatycznie zajęcia przestaną się wyświetlać na stronie.
      </p>
    </div>
  );
}
