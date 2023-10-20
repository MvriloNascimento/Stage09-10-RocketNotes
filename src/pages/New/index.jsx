import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, Form } from "./styles";

import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import { Input } from "../../components/Input";

import { api } from '../../services/api';

export function New() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  const navigate = useNavigate();

  function handleAddLink(){
    setLinks(prevState => [...prevState, newLink]);
    setNewLink("");
  }

  function handleRemoveLink(deleted){
    setLinks(prevState => prevState.filter(link => link !== deleted));
  } 

  function handleAddTag(){
    setTags(prevState => [...prevState, newTag]);
    setNewTag("")
  }

  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter(tag => tag !== deleted));
  }

  function handleBack() {
    navigate(-1)
  }

  async function handleNewNote(){
    if (!title) {
      return alert("Enter the title of the note")
    }

    if(newLink) {
      return alert("You left a link in the add field, but did not click add. Click to add or leave the field empty")
    }

    if(newTag) {
      return alert("You left a tag in the field to add, but did not click add. Click to add or leave the field empty")
    }

    await api.post("/notes", {
      title,
      description,
      tags,
      links
    })

    alert("Note sent successfully!")
    navigate(-1)
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Create note</h1>
            <ButtonText
              title='Back'
              onClick={handleBack}
            />
          </header>

          <Input 
          placeholder="Title"
          onChange={e => setTitle(e.target.value)}
          />
          <Textarea
          placeholder="Comments"
          onChange={e => setDescription(e.target.value)}
          />

          <Section title="Useful links">
            {
              links.map((link, index) => (
                <NoteItem         
                key={String(index)}       
                value={link}
                onClick={() => handleRemoveLink(link)}
                />
              ))
            }
            <NoteItem 
            isNew
            placeholder="New Link"
            value={newLink}
            onChange={e => setNewLink(e.target.value)}
            onClick={handleAddLink}
            />
          </Section>

          <Section title="Tags">
            <div className="tags">
              {
                tags.map((tag, index) => (
                  <NoteItem 
                  key={String(index)}
                  value={tag} 
                  onClick={() => handleRemoveTag(tag)}
                  />
                ))
              }

              <NoteItem 
              isNew
              placeholder="New Tag"
              onChange={e => setNewTag(e.target.value)}
              value={newTag}
              onClick={handleAddTag}
              />
            </div>
          </Section>

          <Button
            title="Save"
            onClick={handleNewNote}
          />
        </Form>
      </main>
    </Container>
  )
}