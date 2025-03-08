"use client";
import React from "react";
import { marked } from "marked";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Poppins } from 'next/font/google';

const AIResponse = ({ text }) => {

    const renderer = new marked.Renderer();

    renderer.code = (code, language) => {
        return `<pre  class="bg-black my-4 text-white  *:text-white p-8 leading-7 rounded-xl"><code class="language-${language}  leading-tight *:text-white" >${code.text}</code></pre>`;
    };

    const formattedText = marked(text, { renderer });

    
    return (
        <div className={` ml-4 text-sm max-w-4xl bg-white p-2 drop-shadow-sm rounded-lg rounded-tl-none `} >
            <div dangerouslySetInnerHTML={{ __html: formattedText }} />
        </div>
    );
};


const AiResponse = ({ aiResponse }) => {
    return (

        <AIResponse text={aiResponse} />
    );
};

export default AiResponse;
