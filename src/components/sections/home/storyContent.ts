/** Redaktionel tekst til velkomst-/storytellingsektionen (bruges af begge varianter). */
export const welcome = {
  label: "Velkommen",
  heading: ["Her er der altid", "plads til lidt", "mere tid."],
  body: [
    "Mad & Mennesker er et nyt spisested på Slotspladsen i Randers. Et sted, hvor man kommer for maden — og bliver for stemningen.",
    "Vi laver klassisk dansk mad af gode råvarer. Smørrebrød, stjerneskud, pariserbøf og de retter, man husker fra de gode middagsborde. Uden dikkedarer, men med omhu og ordentlige portioner.",
    "Her må frokosten gerne trække ud, og aftenen gerne blive lang. Vi dækker op til venner, familier, kolleger og alle andre, der sætter pris på et godt måltid i godt selskab.",
  ],
  chapters: [
    {
      kicker: "Maden",
      title: "Dansk, som den skal smage",
      text: "Et kort, der er til at overskue, og retter, der er til at holde af. Vi koncentrerer os om det, vi gør godt — og laver det ordentligt hver gang.",
      photo: "dining" as const,
    },
    {
      kicker: "Menneskerne",
      title: "Personlig betjening, ingen stivhed",
      text: "Vi vil gerne kende dig næste gang, du kommer. Her bliver du budt velkommen, ikke ekspederet.",
      photo: "private-corner" as const,
    },
    {
      kicker: "Tiden",
      title: "Bliv siddende lidt endnu",
      text: "En kop kaffe mere. En dessert til deling. Et sidste glas i baren. Ingen har travlt hos os.",
      photo: "bar" as const,
    },
  ],
};
