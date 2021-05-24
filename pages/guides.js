import styles from "../styles/Guides.module.css";
import { useEffect, useContext, useState } from "react";
import AuthContext from "../stores/authContext";

export default function Guides() {
  const { user, authReady } = useContext(AuthContext);
  const [guides, setGuides] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authReady) {
      fetch(
        ".netlify/functions/guides",
        user && {
          headers: {
            Authorization: "Bearer " + user.token.access_token,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error("Wanna see this content? You must log in");
          }
          return res.json();
        })
        .then((data) => {
          setGuides(data);
          setError(null);
        })
        .catch((err) => {
          setGuides(null);
          setError(err.message);
        });
    }
  }, [user, authReady]);

  return (
    <div className={styles.guides}>
      {!authReady && <h5>Loading...</h5>}

      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}

      {guides &&
        guides.map((guide, index) => (
          <div key={index} className={styles.card}>
            <h3>{guide.title}</h3>
            <h5>Written by {guide.author}</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem praesentium eligendi sunt eos deserunt quas saepe
              laborum repellendus, vel id quisquam, inventore aperiam vero
              excepturi rem ipsam? Tempore, nisi aut.
            </p>
          </div>
        ))}
    </div>
  );
}
