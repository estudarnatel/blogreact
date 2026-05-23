import React, { useEffect, useState } from "react";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL =
    "https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnQeYwPo__sVn9fAiF5W4bnn3T8eERaKHBeg4g7Smf15wVuCSKlCSGuqZZbdWL5cglQY7vuOfIuuQwi3EBRwPsbCJaregU48J5JU4qmNdWUwfkZzMK0vrp1Z-9ENkxWeYEpAmbjrwvNXCoJOwtuD26T1VD2sKikP3zHxsUcnMY3HF6D39cAOPnGPacEPiH3A4l50kvzLXxGGFIq_sKHsr7sO4g31iamqFpVF13emSMz7qfn7lPP4a613gzezbHdQMXq08Lw-vi7EDVTXMvjp59oanccU0w&lib=Mc7gKNDFWsXKUX18VxT19L_g9uKiEqo84";

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar JSON:", error);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("pt-BR");
  };

  // FILTRO SEGURO
  const filteredMessages = messages.filter((item) => {
    const [message, author, date] = item;

    const searchText = String(search).toLowerCase();

    return (
      String(message).toLowerCase().includes(searchText) ||
      String(author).toLowerCase().includes(searchText) ||
      String(date).toLowerCase().includes(searchText)
    );
  });

  if (loading) {
    return <div>Carregando mensagens do Blog...</div>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Mensagens do Blog</h2>

      <input
        type="text"
        placeholder="Pesquisar mensagens do Blog..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={styles.th}>Author</th>
            <th style={styles.th}>Message</th>
            <th style={styles.th}>Date</th>
          </tr>
        </thead>

        <tbody>
          {filteredMessages.length > 0 ? (
            filteredMessages.map((item, index) => {
              const [message, author, date] = item;

              return (
                <tr key={index}>
                  <td style={styles.td}>{String(author)}</td>
                  <td style={styles.td}>{String(message)}</td>
                  <td style={styles.td}>{formatDate(date)}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan="3"
                style={{
                  padding: "20px",
                  textAlign: "center",
                  border: "1px solid #ccc",
                }}
              >
                Nenhuma mensagem encontrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  th: {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "left",
  },

  td: {
    border: "1px solid #ccc",
    padding: "10px",
    verticalAlign: "top",
  },
};