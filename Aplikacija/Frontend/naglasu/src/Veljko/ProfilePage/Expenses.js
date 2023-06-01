import ExpenseItem from './ExpenseItem';

function Expenses() {
  const expenses = [
    {
      id: 'e1',
      title: 'Toilet Paper',
      amount: 4,
      date: new Date(2020, 7, 14),
      korisnik:"Jovan Memedovic",
      komentar:"Katastrofa, prevario me je"
    },
    { id: 'e2', title: 'New TV', amount: 2, date: new Date(2021, 2, 12),korisnik:"Jasar Muhildzic", komentar:"Odlican posao smo sklopili"},
    {
      id: 'e3',
      title: 'Car Insurance',
      amount: 3,
      date: new Date(2021, 2, 28),
      korisnik:"Ana Jovanovic",
      komentar:"Sve preporuke za saradnju"
    },
    {
      id: 'e4',
      title: 'New Desk (Wooden)',
      amount: 5,
      date: new Date(2021, 5, 12),
      korisnik:"Perid Bukvic",
      komentar:"Sve iz oglasa ispostovano"
    },
  ];

  return (
    <div>
      <ExpenseItem
        title={expenses[0].title}
        amount={expenses[0].amount}
        date={expenses[0].date}
        korisnik={expenses[0].korisnik}
        komentar={expenses[0].komentar}
      ></ExpenseItem>
      <ExpenseItem
        title={expenses[1].title}
        amount={expenses[1].amount}
        date={expenses[1].date}
        korisnik={expenses[1].korisnik}
        komentar={expenses[1].komentar}
      ></ExpenseItem>
      <ExpenseItem
        title={expenses[2].title}
        amount={expenses[2].amount}
        date={expenses[2].date}
         korisnik={expenses[2].korisnik}
         komentar={expenses[2].komentar}
      ></ExpenseItem>
      <ExpenseItem
        title={expenses[3].title}
        amount={expenses[3].amount}
        date={expenses[3].date}
        korisnik={expenses[3].korisnik}
        komentar={expenses[3].komentar}
      ></ExpenseItem>
    </div>
  );
}

export default Expenses;