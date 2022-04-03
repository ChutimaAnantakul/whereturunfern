import { useQuery } from '@apollo/client'
import { loader } from 'graphql.macro'
import { Link } from 'react-router-dom'
const peopleQuery = loader('../graphql/queries/people.gql')

const People = () => {
  const { error, loading, data } = useQuery(peopleQuery)
  if (loading) {
    return 'loading...'
  }
  if (error) {
    return 'error'
  }
  // console.log(data.users)
  // return 'People'
  return <>
  <ul>
    {data.users.nodes.map(person =>(
      <li key={person.id}><Link to={`/${person.id}`}>{person.firstname}</Link></li>
    ))}
  </ul>
  {/* // data. */}
  </>
}


export default People