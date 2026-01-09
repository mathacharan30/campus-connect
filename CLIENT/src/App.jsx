import { Route, Routes, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { QNA } from './pages/QNA';
import { PostQuestion } from "./pages/postQuestion";
import { Answer } from './pages/Answer';
import { NavbarSimple } from "./components/navbar"
import { ViewAnswer } from './pages/ViewAnswer';
import { UploadNotes } from './pages/uploadNotes';
import { ViewNotes } from './pages/viewNotes';
import { Blogs } from './pages/Blogs';
import { UploadBlog } from './pages/UploadBlog';
import { Footer } from './components/footer';
import { ViewSubject } from './pages/viewSubjects';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { BlogPage } from './pages/viewBLog';
import { JobsAndHackathons } from './pages/Jobs_hackathons';
import ProtectedRoute from './ProtectedRoute';
import { NotAuthorized } from './components/NotAuth';
import UploadHackathon from './pages/uploadHackathon';
import JobUpload from './pages/uploadjob';
import { EditQuestion } from './pages/EditQuestion';
import { EditAnswer } from './pages/EditAnswer';
import { EditBlog } from './pages/EditBlog';
import { EditNote } from './pages/EditNote';
import { EditJob } from './pages/EditJob';
import { EditHackathon } from './pages/EditHackathon';
function App() {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === '/';
  const noHeaderFooterRoutes = ['/', '/login', '/signup'];
  const shouldHideHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);
  return (
    <>
      <Provider store={store}>
        {!shouldHideHeaderFooter && <NavbarSimple />}
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={1000}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/notAuthorized" element={<NotAuthorized />} />
              <Route path="/questions" element={<ProtectedRoute element={<QNA />} allowedRoles={['teacher', 'student']} />} />
              <Route path="/postQn" element={<ProtectedRoute element={<PostQuestion />} allowedRoles={['teacher', 'student']} />} />
              <Route path="/answer/:id" element={<ProtectedRoute element={<Answer />} allowedRoles={['teacher', 'student']} />} />
              <Route path="/viewanswer/:id" element={<ProtectedRoute element={<ViewAnswer />} allowedRoles={['teacher', 'student']} />} />
              <Route path="/uploadnotes" element={<ProtectedRoute element={<UploadNotes />} allowedRoles={['teacher', 'student']} />} />
              <Route path="/viewnotes" element={<ProtectedRoute element={<ViewNotes />} allowedRoles={['teacher', 'student']} />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/uploadblogs" element={<ProtectedRoute element={<UploadBlog />} allowedRoles={['alumni']} />} />
              <Route path="/viewblog/:id" element={<BlogPage />} allowedRoles={['teacher', 'student','alumni']}/>
              <Route path="/jobs" element={<ProtectedRoute element={<JobsAndHackathons />} allowedRoles={['teacher', 'student','alumni']} />} />
              <Route path="/uploadhackathon" element={<ProtectedRoute element={<UploadHackathon />} allowedRoles={['teacher', 'student','alumni']} />} />
              <Route path="/uploadjob" element={<ProtectedRoute element={<JobUpload />} allowedRoles={['teacher', 'student','alumni']} />} />
              <Route path="/edit-question/:id" element={<ProtectedRoute element={<EditQuestion />} allowedRoles={['teacher', 'student']} />} />
              <Route path="/edit-answer/:qid" element={<ProtectedRoute element={<EditAnswer />} allowedRoles={['teacher', 'student']} />} />
              <Route path="/edit-blog/:id" element={<ProtectedRoute element={<EditBlog />} allowedRoles={['alumni']} />} />
              <Route path="/edit-note/:id" element={<ProtectedRoute element={<EditNote />} allowedRoles={['teacher', 'student']} />} />
              <Route path="/edit-job/:id" element={<ProtectedRoute element={<EditJob />} allowedRoles={['teacher', 'student','alumni']} />} />
              <Route path="/edit-hackathon/:id" element={<ProtectedRoute element={<EditHackathon />} allowedRoles={['teacher', 'student','alumni']} />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
        {!shouldHideHeaderFooter && <Footer />}
    </Provider>
    </>
  )
}

export default App
