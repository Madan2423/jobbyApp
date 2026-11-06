import './App.css'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LogIn from './components/LogIn'
import Home from './components/Home'
import JobSection from './components/JobSection'
import JobItemDetails from './components/JobItemDetails'
import NotFound from './components/NotFound'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const App = () => (
  <BrowserRouter>
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
      <Route exact path="/login" component={LogIn} />
      <ProtectedRoute exact path="/jobs" component={JobSection} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
