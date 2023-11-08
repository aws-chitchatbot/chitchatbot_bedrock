"use client";

import React, { useState } from "react";
import GlobalConfig from "@/app/app.config"
import ModelSelector from "../shared/TextModelSelector";
import Textarea from "./Textarea";
import { defaultModel } from "../shared/textModels";
import NumericInput from "./NumericInput";

export default function TextContainer() {
    const defaultPayload = { 
        prompt: "", 
        temperature: { min: 0, max: 1, value: 0.8 },
        maxTokens: { min: 85, max: 2048, value: 300 } 
    }

    const [isLoading, setIsLoading] = useState(false);
    const [payload, setPayload] = useState(defaultPayload);
    const [model, setModel] = useState(defaultModel);

    const setPrompt = (newPrompt) => {
        const { prompt, ...rest } = payload;
        setPayload({ prompt: newPrompt, ...rest });
    }

    const setTemperature = (newTemperature) => {
        const { temperature, ...rest } = payload;
        setPayload({ temperature: newTemperature, ...rest });
    }

    const setMaxTokens = (newMaxTokens) => {
        const { maxTokens, ...rest } = payload;
        setPayload({ maxTokens: newMaxTokens, ...rest });
    };

    const onModelChange = (newModel) => {
        setModel(newModel);
        setPrompt("");
    }

    const handlePromptChange = (e) => { 
        setPrompt(e.target.value); 
    };

    const handleTemperatureChange = (value) => {
        setTemperature(value);
    };

    const handleMaxTokensChange = (value) => {
        setMaxTokens(value);
    };

    const isNullOrBlankOrEmpty = (str) => {
        return str == null || str.match(/^ *$/) !== null;
    }

    const getButtonClass = () => {
        const inactiveButtonClass = "flex w-[100px] items-center justify-center bg-indigo-300 rounded-xl text-white px-3 py-2 flex-shrink-0";
        const activeButtonClass = "flex w-[100px] items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-3 py-2 flex-shrink-0";
        return isLoading ? inactiveButtonClass : activeButtonClass;
    }

    const sendMessage = async () => {
        if (isNullOrBlankOrEmpty(payload.prompt)) { return; }

        setIsLoading(true);

        const endpoint = `/foundation-models/model/text/${model.modelId}/invoke`;
        const api = `${GlobalConfig.apiHost}:${GlobalConfig.apiPort}${endpoint}`;

        try {
            const body = JSON.stringify({
                prompt: payload.prompt,
                temperature: payload.temperature.value,
                maxTokens: payload.maxTokens.value
            });

            console.log(body);

            const response = await fetch(api, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: body
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            await response.json().then(data => {
                if (model.modelId === "anthropic.claude-v2") {
                    setPrompt(`Human: ${payload.prompt}\n\nAssistant: ${data.completion}\n\nHuman: `)
                } else {
                    setPrompt(`${payload.prompt}\n\n${data.completion}\n\n`)
                }
            });

        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col flex-auto h-full p-6">
            <h3 className="text-3xl font-medium text-gray-700">Text Playground</h3>
            <div className="flex flex-col flex-shrink-0 rounded-2xl bg-gray-100 p-4 mt-8">
                <ModelSelector model={model} onModelChange={onModelChange} />
                <Textarea 
                    value={payload.prompt} 
                    disabled={isLoading}
                    onChange={handlePromptChange} 
                />
                <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                        <div className="">
                            <div className="relative w-full">
                                <label htmlFor="temperature">
                                    Temperature:
                                </label>
                            </div>
                        </div>
                        <div className="ml-4">
                            <NumericInput
                                className="relative w-14"
                                placeholder="0.8"
                                value={payload.temperature}
                                disabled={isLoading}
                                callback={handleTemperatureChange}
                            />
                        </div>
                        <div className="ml-8">
                            <div className="relative">
                                <label htmlFor="tokens">
                                    Max. length:
                                </label>
                            </div>
                        </div>
                        <div className="ml-4">
                            <NumericInput 
                                className="relative w-20"
                                placeholder="300"
                                value={payload.maxTokens}
                                disabled={isLoading}
                                callback={handleMaxTokensChange}
                            />
                              </div>
                        <div className="ml-4 ml-auto">
                            <button
                                type="button"
                                disabled={isLoading}
                                onClick={sendMessage}
                                className={getButtonClass()}>
                                <span>Send</span>
                                <span className="ml-2">
                                <svg
                                    className="w-4 h-4 transform rotate-45 -mt-px"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8">
                                </path>
                                </svg>
                            </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};