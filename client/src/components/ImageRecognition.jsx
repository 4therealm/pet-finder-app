import React,{useState,useRef,useReducer} from "react"
import * as mobilenet from "@tensorflow-models/mobilenet"

const stateMachine={
  //stateMachine below is the 'main hub' for the stages that the image recognizer needs to take.
  //  First we set the initial state to 'initial'
  //  'next' is a trigger that brings the state to the next step. When you call next, the state changes.
  //  The 'on' allows for other events to trigger state transitions.
  // Notice how the

  //The reducer function is used as the 'assembly line' to change the StateMachine to whatever state we want it to be.
  initial: "initial",
  states: {
    initial: {on: {next: "loadingModel"}},
    loadingModel: {on: {next: "modelReady"}},
    modelReady: {on: {next: "imageReady"}},
    // In this stage, the 'showImage' property is set to true to indicate that am image is ready to be displayed
    imageReady: {on: {next: "identifying"},showImage: true},
    identifying: {on: {next: "complete"}},
    complete: {on: {next: "modelReady"},showImage: true,showResults: true}
  }
}

function ImageRecognizer() {
  //State used to control the image recognition model
  const [model,setModel]=useState(null)

  //'useRef' is a hook used to keep track of state that shouldn't re-render when it's updated.
  const imageRef=useRef()
  const inputRef=useRef()

  //State used to save the url of the image
  const [imageURL,setImageURL]=useState(null)

  //State used to control the results of the image recognition
  const [results,setResults]=useState([])

  //This is the primary code for keeping track of the state of StateMachine. 
  const reducer=(state,event) =>
    //Here we retrieve the object corresponding to the current state. notice that the [state] is a 'property key' and is used to access a specific property in the 'stateMachine.states' object. 
    stateMachine.states[state].on[event]||stateMachine.initial

  //AppState is the current state of the StateMachine defined above. We use this reducer function to change between the next stages of the 'StateMachine'
  const [appState,dispatch]=useReducer(reducer,stateMachine.initial)

  //Another core function, this causes the state from the 'stateMachine' to transfer to the next state
  const next=() => dispatch("next")

  const loadModel=async () => {
    //Again, this is responsible for transitioning the stateMachine to the next state.
    next()

    //This loads in the image recognition library
    const model=await mobilenet.load()

    //Here we use more state to updated the current loaded model. Keep in mind that the model does take about 15 seconds to load. 
    setModel(model)

    //Moving to the next state from the 'stateMachine'
    next()
  }

  //As we will see later, this function is called when the button is set to 'Identify Breed'. This is the core operation of the application that is responsible for getting the animal breed
  const identify=async () => {
    next()

    //The 'imageRef' is a reference to the image that the user uploads. This 'ref' key can be found in the <input/> field itself
    //  The '.classify' method returns an array of objects of the most likely breeds.
    //  The '.current" is tied into the 'useRef' hook, and is a variable which is used to store the variable you want to keep track of
    const results=await model.classify(imageRef.current)

    //Setting the 'results' state from the '.classify' so it can be used to render things in the DOM
    setResults(results)
    next()
  }

  //The function responsible for clearing / resetting the state so the user can upload another image if they like
  const reset=async () => {
    setResults([])
    next()
  }

  //The function responsible for allowing the user to upload an image when the user clicks on the button
  const upload=() => inputRef.current.click()

  //Responsible for handling the change when the user uploads an image
  const handleUpload=event => {

    //Destructuring the 'file' object from the image upload, since an image is technically a file
    const {files}=event.target

    //Technically, you can upload multiple files if you like, but we only want to get one file at a time, so we make sure that the user only uploaded one file.
    if(files.length>0) {

      //When an image is uploaded, it require a url. It is not a normal url that reference a website (since you are getting the image from your machine)
      const url=URL.createObjectURL(event.target.files[0])

      //The state that lets the DOM know that an image has been provided (similar to the 'ProfileImage' component)
      setImageURL(url)
      next()
    }
  }
  //This object is responsible for updating the button's text (there is only one button) and functionality. As we move to a different state, we update the button accordingly. 
  //  The 'appState' variable, tied in with the 'reducer' hook is responsible for keeping track on what the button should do / its text should be
  const actionButton={
    initial: {action: loadModel,text: "Need a reminder of the breed? click here"},
    loadingModel: {text: "Loading Model..."},
    modelReady: {action: upload,text: "Upload Image"},
    imageReady: {action: identify,text: "Identify Breed"},
    identifying: {text: "Identifying..."},
    complete: {action: reset,text: "Reset"}
  }
  //  'Destructuring the 'showImage' property of the 'stateMachine' allows us to conditionally render different parts of the UI based on the current state of the state machine.
  //  'stateMachine.states[appState]' returns the state object for the current state of the stateMachine
  const {showImage,showResults}=stateMachine.states[appState]

  return (
    <div>
      <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
        {/* If the image exists (if the property of 'stateMachine' is not null), display the image here */}
        {showImage&&<img src={imageURL} alt="upload-preview" ref={imageRef} />}
      </div>
      <div>
        {/* We need the 'boilerplate' 'upload file' here for this to work, along with an input field for the 'handleUpload' function to work. I simply set the display to 'none' and it still provides the correct functionality with hiding it from the user */}
        <input style={{display: 'none'}}
          type="file"
          accept="image/*"
          capture="camera"
          onChange={handleUpload}
          ref={inputRef}
        />
      </div>
      {showResults&&(
        <ul style={{textAlign: 'center',listStyleType: 'none'}}>

          {/* The 'results' variable is actually an object */}
          <p style={{textDecoration: "underline"}}>Here are the results with the likelyhood of breed:</p>
          {results.map(({className,probability}) => (
            <li key={className}>
 <button onClick={() => {
                navigator.clipboard.writeText(`${className}`)
              }}>
              {`${className}: %${(probability*100).toFixed(2)}`}
              <br />
          </button>
            </li>
          ))}
          <p style={{textDecoration: "underline"}}>Click on the breed to copy it to your clipboard</p>
        </ul>
      )}
      <div style={{display: "flex",justifyContent: "center",alignItems: 'center'}}>
        {/* the 'onClick' here checks if there is a function associated with the current state. Remember that the 'appState' is the current state of the stateMachine, and we are simply checking to see if there is an 'action' function associated with that state */}
        <button className="btn btn-rounded btn-dark" style={{margin: '0 auto'}} onClick={actionButton[appState].action||(() => {})}>
          {actionButton[appState].text}
        </button>
      </div>
    </div>
  )
}

export default ImageRecognizer
