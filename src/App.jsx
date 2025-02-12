import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import CodeTool from "@editorjs/code";
import Checklist from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import Warning from "@editorjs/warning";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";

const Editor = () => {
  const editorInstance = useRef(null);
  const [isEditorReady, setIsEditorReady] = useState(false);

  useEffect(() => {
    const initializeEditor = () => {
      if (editorInstance.current || !document.getElementById("editorjs")) {
        return; // Empêche une double initialisation
      }

      editorInstance.current = new EditorJS({
        holder: "editorjs",
        autofocus: true,
        tools: {
          header: { class: Header, inlineToolbar: true },
          list: { class: List, inlineToolbar: true },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile(file) {
                  return new Promise((resolve) => {
                    const imageUrl = URL.createObjectURL(file);
                    resolve({
                      success: 1,
                      file: { url: imageUrl },
                    });
                  });
                },
              },
            },
          },
          quote: { class: Quote },
          table: { class: Table },
          code: { class: CodeTool },
          checklist: { class: Checklist },
          delimiter: { class: Delimiter },
          embed: { class: Embed },
          warning: { class: Warning },
          marker: { class: Marker },
          inlineCode: { class: InlineCode },
        },
        onReady: () => {
          console.log("✅ Editor.js est prêt !");
          setIsEditorReady(true);
        },
        onChange: async () => {
          const content = await editorInstance.current.save();
          console.log("💾 Contenu enregistré :", content);
        },
      });
    };

    setTimeout(initializeEditor, 100); // Attendre 100ms pour s'assurer que le DOM est prêt

    return () => {
      if (editorInstance.current && typeof editorInstance.current.destroy === "function") {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column" }}>
      <h2 style={{ textAlign: "center", padding: "20px" }}>Test de Editor.js</h2>
      {!isEditorReady && <p style={{ textAlign: "center", padding: "20px" }}>Chargement de l'éditeur...</p>}
      <div id="editorjs" style={{
        flexGrow: 1,
        padding: "20px",
        boxSizing: "border-box",
        overflow: "auto",
      }}></div>
    </div>
  );
};

export default Editor;
