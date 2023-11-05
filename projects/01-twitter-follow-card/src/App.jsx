import './App.css'
import TwitterFollowCard from './TwitterFollowCard'

const App = () => {

  return (
    <section className='App'>
      <TwitterFollowCard 
        userName={'Emmanuell_21'} 
        name={'Emmanuel Fernández'} 
      />

      <TwitterFollowCard 
        userName={'PaolaNovelo_'} 
        name={'Paola Novelo'} 
      />

      <TwitterFollowCard 
        userName={'elonmusk'} 
        name={'Elon Musk'} 
      />

      <TwitterFollowCard 
        userName={'BillGates'} 
        name={'Bill Gates'} 
      />
    </section>
  )
}

export default App