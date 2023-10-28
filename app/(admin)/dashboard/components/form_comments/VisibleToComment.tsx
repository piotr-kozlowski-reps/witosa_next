export default function VisibleToComment() {
  return (
    <div className="prose">
      <p>
        Dzień, po którego zakończeniu dane wydarzenie przestanie być widoczne na
        stronie www.
      </p>
      <p>
        Jeżeli chcesz, aby przestało się pojawiać na następny dzień po dacie
        samego wydarzenia, naciśnij przycisk{' '}
        <b>&quot;ustaw datę na dzień wydarzenia&quot;</b>.<br />
        (ta data oczywiście musi być wcześniej w formularzu wpisana)
      </p>
      <p>
        Jeżeli chcesz, aby wydarzenie było wyświetlane do momentu, aż samemu
        zdecydujesz inaczej - wpisz absurdalnie przyszłą datę zakończenia.
      </p>
    </div>
  );
}
