"use client";

import { useState } from "react";
import axios from "axios";
import styles from "./page.module.css";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL,
        { query: input },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const botMessage = {
        sender: "bot",
        text: response.data?.resposta || "Sem resposta disponível.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Erro ao conectar com o backend:", error);
      const errorMessage = {
        sender: "bot",
        text: "Erro ao conectar com o servidor.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={styles.body}>
      
      <div className={styles.container}>
      
        <div className={styles.header}>
          <h1 className={styles.title}>Como posso ajudar?</h1>
        </div>

        <div className={styles.messages}>
        {messages.map((msg, index) => (
          <div key={index} className={`${styles.message} ${styles[msg.sender]}`}>
            {msg.text}
          </div>
        ))}
      </div>

        <div className={styles.inputSection}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Envie uma mensagem para o ChatFUT"
            className={styles.input}
          />
          <button onClick={sendMessage} className={styles.sendButton}>
            <span>Enviar</span>
          </button>
        </div>

        <div className={styles.rulesTitle}>O que posso perguntar?</div>

        <div className={styles.footer}>
          <span className={styles.footerItem}>Gols</span>
          <span className={styles.footerItem}>Escanteios</span>
          <span className={styles.footerItem}>Árbitro</span>
          <span className={styles.footerItem}>Faltas</span>
          <span className={styles.footerItem}>Bola parada</span>
          <span className={styles.footerItem}>Impedimentos</span>
          <span className={styles.footerItem}>Estádio</span>
          <span className={styles.footerItem}>Vencedor</span>
          <span className={styles.footerItem}>Chutes</span>
        </div>

        <div className={styles.informationContainer}>
          <div className={styles.rulesContainer}>
            <span className={styles.rulesTitle}>Regras de interação</span>
            <span className={styles.rulesTrigger}>?</span>
            <div className={styles.rulesTooltip}>
              <ul>
                <li>
                  As perguntas devem ser sobre jogos do campeonato brasileiro
                  dos anos de 2020 até 2023.
                </li>
                <li>
                  O formato das datas no banco de dados consultado estão como
                  DD-MM-AAAA.
                </li>
                <li>
                  O chat não está configurado para lembrar de respostas
                  anteriores, é necessário informar todos os detalhes a cada
                  nova pergunta.
                </li>
                <li>Seja claro e forneça detalhes do que gostaria de saber.</li>
                <li>Alguns jogos da temporada/ano 2020 aconteceram no início de 2021, devido interrupção do campeonato.</li>
                <li>
                  Exemplo de pergunta: Quantos escanteios tiveram para cada time
                  no jogo entre Palmeiras e Flamengo em 8 de julho de 2023?
                </li>                 
              </ul>
            </div>
          </div>

          <div className={styles.disclaimerContainer}>
            <span className={styles.disclaimerTitle}>Disclaimer</span>
            <span className={styles.disclaimerTrigger}>?</span>
            <div className={styles.disclaimerTooltip}>
              <ul>
                <li>
                  Este chatbot utiliza um banco de dados que, apesar de conter
                  informações reais, possui caráter experimental e é destinado
                  exclusivamente para demonstração. Por esse motivo, as
                  informações podem estar incompletas, imprecisas ou conter
                  erros, incluindo possíveis alucinações geradas pelas
                  respostas. Recomendamos que você não tome decisões importantes
                  com base nas informações apresentadas aqui.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
