import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { Header } from "../../components/Header";
import { Section } from "../../components/Section";
import { Tag } from "../../components/Tag";
import { Container, Links, Content } from "./styles.js";


import { api } from "../../services/api";

//useParams = buscar parâmetros na pagina

export function Details() {
  const [data, setData] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  console.log(data);

  function handleBack() {
    navigate(-1);
  }

  async function handleRemove() {
    const confirm = window.confirm("I really want to remove a note?");
    if (confirm) {
      await api.delete(`/notes/${params.id}`);
      handleBack();
    }
  }

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
    }
    fetchNote();
  }, []);

  return (
    <Container>
      <Header />
      {data && (
        <main>
          <Content>
            <ButtonText title="Delete note" onClick={handleRemove} />

            <h1>{data.title}</h1>
            <p>{data.description}</p>

            {data.links && (
              <Section title="Useful links">
                <Links>
                  {data.links.map((link) => (
                    <li key={String(link.id)}>
                      <a href={link.url} target="_blank">
                        {link.url}
                      </a>
                    </li>
                  ))}
                </Links>
              </Section>
            )}

            {data.tags && (
              <Section title="Tags">
                {data.tags.map((tag) => (
                  <Tag key={String(tag.id)} title={tag.name} />
                ))}
              </Section>
            )}

            <Button title="Back" onClick={handleBack} />
          </Content>
        </main>
      )}
    </Container>
  );
}