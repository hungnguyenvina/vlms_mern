import { combineReducers } from 'redux';
import { QuestionCategoryReducer } from './QuestionCategoryReducer';
import { CourseCategoryReducer } from './CourseCategoryReducer';
import { CourseReducer } from './CourseReducer';
import { CartReducer } from './CartReducer';
import { reducer as jPlayers } from 'react-jplayer';

// Styles the jPlayer to look nice
import 'react-jplayer/src/less/skins/sleek.less';
// Styles Play/Pause/Mute etc when icons (<i />) are used for them
import 'react-jplayer/src/less/controls/iconControls.less';

import VideoPlayer from '../../../src/components/Jplayer/videoPlayer';

import { UserReducer } from './UserReducer';
/*import { QuestionReducer } from './QuestionReducer';

import { ShareReducer } from './ShareReducer';
import { OneQuestionPerPageQuizReducer } from './OneQuestionPerPageQuizReducer';
import { TransactionReducer } from './TransactionReducer';



*/
export default combineReducers ({
    question_categories : QuestionCategoryReducer,
    course_categories : CourseCategoryReducer,
    courses: CourseReducer,
    carts: CartReducer,
    users : UserReducer,
    jPlayers 
   // users : UserReducer,
  //  questions: QuestionReducer,
  //  share: ShareReducer,

 //   one_question_per_page_quizzes: OneQuestionPerPageQuizReducer,
 //   transactions: TransactionReducer,
 //   
});