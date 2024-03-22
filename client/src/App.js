import {useMemo, useState, useRef } from 'react'
import {getGeocode, getLatLng} from "use-places-autocomplete"
import { FaLocationArrow, FaTimes } from 'react-icons/fa'
import axios from 'axios'
import {Formik, Form, ErrorMessage, Field} from 'formik'
import * as Yup from 'yup'
import './App.css'
import {
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
  useLoadScript,
} from '@react-google-maps/api'
import {AdvancedMarker} from '@vis.gl/react-google-maps'

function App() {
  const center = useMemo(()=>({ lat: 48.8584, lng: 2.2945 }), [])
  const [ libraries ] = useState(['places']);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries,
  })

  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')

   /** @type React.MutableRefObject<HTMLInputElement> */
   const latitudeRef = useRef()
   /** @type React.MutableRefObject<HTMLInputElement> */
   const longitudeRef = useRef()
   /** @type React.MutableRefObject<HTMLInputElement> */
   const originRef = useRef()
   /** @type React.MutableRefObject<HTMLInputElement> */
   const destiantionRef = useRef()
   /** @type React.MutableRefObject<HTMLInputElement> */
   const fullnameRef = useRef()
   /** @type React.MutableRefObject<HTMLInputElement> */
   const emailRef = useRef()
  
  //check if Google map API is loaded
  if (!isLoaded) {
    return <div>Loading</div>
  }

  //Initial form value
  const initialValues = {
    fullname: "",
    email: "",
    latitude: "",
    longitude: "",
    destination: "",
  }

  //user input validation on form submission
  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('Fullname is required'),
    email: Yup.string().required('Email is required'),
    destination: Yup.string().required('Destination address is required'),
    origin: Yup.string().required('Origin address is required'),
  })

  //on form submission post form data to database
  const onSubmit = (data) =>{
    CalculateRoute(data)
    axios.post(`https://localhost:3001/location`, data).then((response) =>{
      return
    })
  }
  
  //convert destination address to positional cordinates to store in database
  async function getLatAndLng(data){
    const destinationAddr = await getGeocode({address: data.destination})
    const {lat, lng} = getLatLng(destinationAddr[0])

    latitudeRef.current.value = lat
    longitudeRef.current.value = lng
  }

  //mark out the route between origin and destination if set
  async function CalculateRoute(data) {
    if (data.origin === '' || data.destination === '') {
      return
    }
    getLatAndLng(data)
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: data.origin,
      destination: data.destination,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  //clear mark route and user input
  function ClearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
    fullnameRef.current.value = ''
    emailRef.current.value = ''
    latitudeRef.current.value = ''
    longitudeRef.current.value = ''
  }
  return (
    <>
    <div style={{position:'relative',flexDirection:'column', alignItems:'center', h:'100vh', w:'100vw'}}>
      <div style={{position:'absolute', left: 0, top: 0, h:"100%", w:"100%"}}>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <AdvancedMarker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </div>
      <div style={{padding:4, borderRadius:'12px', margin:4, backgroundColor:'white', boxShadow:'1px 1px 10px 1px grey', minWidth:50, zIndex:'1'}}>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form className="formContainer">
            <div style={{spacing:1, justifyContent:'space-between'}}>
              <div style={{flexGrow:1}}>
                <label>Fullname</label>
                <ErrorMessage name="fullname" component="span" style={{color:"red"}}/>
                <Autocomplete>
                  <Field name="fullname" type='text' placeholder='Customer fullname' as="input" ref={fullnameRef} id="inputCreatePost"/>
                </Autocomplete>
              </div>
              <div style={{flexGrow:1}} >
                <label>Email</label>
                <ErrorMessage name="email" component="span" style={{color:"red"}}/>
                <Autocomplete>
                  <Field name="email" type='email' placeholder='Customer email' as="input" ref={emailRef} id="inputCreatePost"/>
                </Autocomplete>
              </div>
              <div style={{flexGrow:1}}>
                <Autocomplete>
                  <Field name="latitude" type='hidden' as="input" ref={latitudeRef} id="inputCreatePost"/>
                </Autocomplete>
              </div>
              <div style={{flexGrow:1}}>
                <Autocomplete>
                  <Field name="longitude" type='hidden' as="input" ref={longitudeRef} id="inputCreatePost"/>
                </Autocomplete>
              </div>
              <div style={{flexGrow:1}}>
                <label>Origin</label>
                <ErrorMessage name="origin" component="span" style={{color:"red"}}/>
                <Autocomplete>
                  <Field name="origin" type='text' placeholder='Origin' as ="input" ref={originRef} id="inputCreatePost"/>
                </Autocomplete>
              </div>
              <div style={{flexGrow:1}}>
                <label>Destination</label>
                <ErrorMessage name="destination" component="span" style={{color:"red"}}/>
                <Autocomplete>
                  <Field
                    name="destination"
                    type='text'
                    placeholder='Destination' as ="input" ref={destinationRef} id="inputCreatePost"
                  />
                </Autocomplete>
              </div>

              <div>
                <button style={{backgroundColor: "pink"}} type='submit'>
                  Calculate Route
                </button>
                <button
                  className="clear"
                  aria-label='center back'
                  onClick={ClearRoute}
                ><FaTimes /></button>
              </div>
            </div>
            <div style={{spacing:4, marginTop:"4px", justifyContent:'space-between'}}>
              <p>Distance: {distance} </p>
              <p>Duration: {duration} </p>
              <button
                aria-label='center back'
                onClick={() => {
                  map.panTo(center)
                  map.setZoom(15)
                }}
              ><FaLocationArrow /></button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
    </>
  )
}

export default App
