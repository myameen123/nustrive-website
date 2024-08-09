const [exams, setExams] = useState([])
    const [currentExam, setCurrentExam] = useState(0)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [questions, setQuestions] = useState([])

    const [reviewSate, setReviewState] = useState(false) // If the user enters review mode this state will turn true
    const [reviewIndexes, setReviewIndexes] = useState([])

    let QUESTION = questions[currentIndex] || {}

    // States persist between re-renders
    const [STATICS, setSTATICS] = useState({
        TOTAL_QUESTIONS: 0,
        RANDOM_KEY: Math.round(Math.random() * 10),
        START_TIME: new Date(),
    })

    const [currentAnswer, setCurrentAnswer] = useState('') // an answer that is selected in the input radio button
    const [selectedAnswersArray, setSelectedAnswersArray] = useState([]) // Basically the chosen and saved answers

    // const startTime = new Date()

    const [isLoading, setIsLoading] = useState(true)

    const getExams = async () => {
        setIsLoading(true)
        setExams([])
        let start = 0
        try {
            const response = await fetch(
                process.env.NEXT_PUBLIC_URL +
                    /api/fetchExams?title=${params.id}
            )
            if (!response.ok) {
                throw new Error('Server Error')
            }
            const data = await response.json()
            console.log({ data })
            if (!data.status) throw new Error(data.message)
            const { allQuestions, backendResponse, loginStatus } = data
            setQuestions(allQuestions)
            const exams = backendResponse.map((exam) => {
                const newExamItem = {}
                newExamItem.start = start
                newExamItem.title = exam.title
                newExamItem.courseID = exam.course
                newExamItem.questions = exam.questions
                newExamItem.ID = exam.id
                // newExamItem.questions = [...exam.expand.questions];
                newExamItem.courseName = exam.expand.course.title
                start += exam.questions.length
                return newExamItem
            })
            setSTATICS({ ...STATICS, TOTAL_QUESTIONS: start })
            const nullAnswers = new Array(start).fill(null)
            setSelectedAnswersArray(nullAnswers)
            setExams(exams)
            alert(
                `You are about to start the test. Follow this link to read the instructions: https://www.crashcoursed.com/instructions`
            )
            if (!loginStatus)
                alert(
                    'You are not logged in. You can attempt the test, but your answers will not be saved unless you signup for free'
                )
        } catch (err) {
            console.log(err)
            alert(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getExams()
    }, [])

    useEffect(() => {
        if (reviewSate) {
            setCurrentIndex(reviewIndexes[0])
        } else {
            setCurrentIndex(0)
            setCurrentExam(0)
        }
    }, [reviewSate])

   
    useEffect(() => {
        setCurrentAnswer(selectedAnswersArray[currentIndex] || '')
        if (reviewSate) {
            // Check to which exam the current index belongs to
            let examIndex = 0
            for (let i = 0; i < exams.length; i++) {
                if (currentIndex >= exams[i].start) {
                    examIndex = i
                    break
                }
            }
            setCurrentExam(examIndex)
        } else if (
            currentIndex >
            exams[currentExam]?.start + exams[currentExam]?.questions.length - 1
        ) {
            setCurrentExam(currentExam + 1)
        }
        if (currentIndex < exams[currentExam]?.start) {
            setCurrentExam(currentExam - 1)
        }
    }, [currentIndex])

    const nextIndex = () => {
        if (isLoading) return
        if (!reviewSate) {
            if (currentIndex >= STATICS.TOTAL_QUESTIONS - 1)
                return alert('You are at the last question')
            //! Recheck this condition
            if (currentIndex + 1 >= exams[currentExam + 1]?.start)
                setCurrentExam(currentExam + 1)
            setCurrentIndex(currentIndex + 1)
        } else {
            if (currentIndex >= reviewIndexes[reviewIndexes.length - 1])
                return alert('You are at the last question')
            //! Recheck this condition
            // if (currentIndex + 1 >= exams[currentExam + 1]?.start)
            // setCurrentExam(currentExam + 1)
            const currentReviewIndex = reviewIndexes.indexOf(currentIndex)
            setCurrentIndex(reviewIndexes[currentReviewIndex + 1])
        }
    }

    const prevIndex = () => {
        if (isLoading) return
        if (!reviewSate) {
            if (currentIndex <= 0) return alert('You are at the first question')
            setCurrentIndex(currentIndex - 1)
            if (currentIndex < exams[currentExam]?.start)
                setCurrentExam(currentExam - 1)
            setCurrentIndex(currentIndex - 1)
        } else {
            if (currentIndex <= reviewIndexes[0])
                return alert('You are at the first question')
            setCurrentIndex(currentIndex - 1)
            // if (currentIndex < exams[currentExam]?.start)
            //     setCurrentExam(currentExam - 1)
            const currentReviewIndex = reviewIndexes.indexOf(currentIndex)
            setCurrentIndex(reviewIndexes[currentReviewIndex + 1])
        }
    }

    const saveAns = () => {
        if (isLoading) return
        let temp = [...selectedAnswersArray]
        temp[currentIndex] = currentAnswer
        setSelectedAnswersArray([...temp])
    }

    const nextSection = () => {
        if (isLoading || reviewSate) return
        if (currentExam === exams.length - 1) return
        setCurrentExam(currentExam + 1)
        setCurrentIndex(exams[currentExam + 1].start)
    }

    const prevSection = () => {
        if (isLoading || reviewSate) return
        if (currentExam === 0) return
        setCurrentExam(currentExam - 1)
        setCurrentIndex(exams[currentExam - 1].start)
    }

    const moveStart = () => {
        if (isLoading) return
        if (reviewSate) setCurrentIndex(reviewIndexes[0])
        else setCurrentIndex(exams[currentExam].start)
    }

    const moveEnd = () => {
        if (isLoading) return
        if (reviewSate) setCurrentIndex(reviewIndexes[reviewIndexes.length - 1])
        else {
            const lastQuestion =
                exams[currentExam].start +
                exams[currentExam].questions.length -
                1
            setCurrentIndex(lastQuestion)
        }
    }

    const addToReview = () => {
        if (isLoading) return
        if (!reviewSate) setReviewIndexes([...reviewIndexes, currentIndex])
    }

    const finishTest = async () => {
        if (isLoading) return
        setIsLoading(true)
        try {
            const response = await fetch('/api/finishTest', {
                method: 'POST',
                body: JSON.stringify({
                    answers: selectedAnswersArray,
                    exams,
                }),
            })
            if (!response.ok) {
                const res = await response.json()
                throw new Error(res?.message || '')
            }
            const res = await response.json()
            alert(
                "Your answers have been submitted. You can check your results on the 'Dashboard' page. You're will be redirected to the dashboard now."
            )
            router.push('/dashboard/courses')
            setIsLoading(true)
        } catch (err) {
            console.log(err)
            downloadTestAnswers(selectedAnswersArray, ${exams[0].title}.json)
            alert(
                err.message +
                    " We couldn't submit your answers. Your answers have been recorded and downloaded to your device. Please try again later. Apologies for the inconvenience caused."
            )
        } finally {
            setIsLoading(false)
        }
    }