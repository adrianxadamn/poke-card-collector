import { useEffect, useState } from "react"
import getFirebaseInstance from "./firebase"
import loadFirebaseDependencies from "./loadFirebaseDependencies"
import moment from 'moment';

function useAuth() {
    const [user, setUser] = useState(null)
    const [firebase, setFirebase] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState(null);

    // use cookies to store data to prevent firebase document reads

    useEffect(() => {
        let unsubscribe
        let publicProfileUnsubscribe

        loadFirebaseDependencies.then(app => {
            const firebaseInstance = getFirebaseInstance(app)
            setFirebase(firebaseInstance)

            unsubscribe = firebaseInstance.auth.onAuthStateChanged(userResult => {
                console.log("userResult:", userResult);
                if (userResult) {
                    firebaseInstance.getUserProfile({
                      user_id: userResult.uid
                    }).then(r => {
                      firebaseInstance.getUserDocById({
                        user_id: userResult.uid
                      }).then(r => {
                        setUserData(r);
                        const lastLoginDate = moment(r.last_login).format('MM/DD/YYYY');
                        const todaysDate = moment().format('MM/DD/YYYY');
                        const stringDate = moment().format('ddd, DD MMMM YYYY h:mm:ss');
                        if (lastLoginDate !== todaysDate) {
                          firebaseInstance.updateUserLoginDate(r, stringDate);
                        }
                        if (r.pokemons.length === 151 && r.completion_date === undefined) {
                          firebaseInstance.addCompletionDate(r, stringDate);
                        } 
                      });
                    });
                    setUser(userResult);
                }else{
                    setUser(null);
                }

                setLoading(false);
            });
        })

        return () => {
            if (unsubscribe) {
                unsubscribe()
            }

            if (publicProfileUnsubscribe) {
                publicProfileUnsubscribe()
            }
        }
    }, [])

    return { user, firebase, loading, userData, setUserData }
}

export default useAuth
