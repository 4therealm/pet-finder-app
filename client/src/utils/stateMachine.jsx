import React, { createContext, useContext, useState } from 'react';

//Creating a context object using the createContext hook. The default value is an empty object, but this will be updated later with a stateMachine object.
export const stateMachineContext = createContext({});

// This hook will be used to access the stateMachine object throughout the app.
export const useStateMachineContext = () => useContext(stateMachineContext);

export const StateMachineProvider = ({children}) => {
  // Keep in mind that the state is responsible for controlling the imageRecognition button and the stage that the button is on. We need to permeate the state of the 'stateMachine' and feed it to the button.
  const [state, setState] = useState({ currentState: 'initial'});

  //We want to be able to use the 'next()' function throughout the files (Homepage, AddPetPage, ImageRecognition), so we add it to our context here:
  const next = () => {
    const nextState = stateMachine.states[state.currentState].on.next;
    if (nextState) {
      setState( { ...state, currentState: nextState});
    }
  }

const stateMachine = {
    //stateMachine below is the 'main hub' for the stages that the image recognizer needs to take.
    //  First we set the initial state to 'initial'
    //  'next' is a trigger that brings the state to the next step. When you call next, the state changes.
    //  The 'on' allows for other events to trigger state transitions.
    // Notice how the

    //The reducer function is used as the 'assembly line' to change the StateMachine to whatever state we want it to be.
  initial: "initial",
  states: {
    initial: { on: { next: "loadingModel" } },
    loadingModel: { on: { next: "modelReady" } },
    modelReady: { on: { next: "imageReady" } },
    // In this stage, the 'showImage' property is set to true to indicate that am image is ready to be displayed
    imageReady: { on: { next: "identifying" }, showImage: true },
    identifying: { on: { next: "complete" } },
    complete: { on: { next: "modelReady" }, showImage: true, showResults: true }
  },
  next
};

    return  (
        <stateMachineContext.Provider value={{stateMachine}}>
            {children}
        </stateMachineContext.Provider>
    )
}