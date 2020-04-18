import { useEffect, useState } from "react"
import getFirebaseInstance from "./firebase"
import loadFirebaseDependencies from "./loadFirebaseDependencies"

function useAuth() {
    const [user, setUser] = useState(null)
    const [firebase, setFirebase] = useState(null)
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState(null);

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
                      firebaseInstance.getUserDoc({
                        user_id: userResult.uid
                      }).then(r => {
                        setUserData(r);
                      });
                    });
                    setUser(userResult);
                    // get user custom claims
                    /*setLoading(true);
                    Promise.all([
                        firebaseInstance.getUserProfile({ user_id: userResult.uid }),
                        firebaseInstance.auth.currentUser.getIdTokenResult(true),
                    ]).then((result) => {
                        const publicProfileResult = result[0]
                        const token = result[1]

                        if (publicProfileResult.empty) {
                            publicProfileUnsubscribe = firebaseInstance.db
                              .collection("publicProfiles")
                              .where("user_id", "==", userResult.uid)
                              .onSnapshot((snapshot) => {
                                  const publicProfileDoc = snapshot.docs[0]
                                  if (publicProfileDoc && publicProfileDoc.id) {
                                      setUser({
                                          ...userResult,
                                          admin: token.claims.admin,
                                          username: publicProfileDoc.id,
                                      })
                                  }

                                  setLoading(false)
                              })
                        } else {
                            const publicProfileDoc = publicProfileResult.docs[0]
                            if (publicProfileDoc && publicProfileDoc.id) {
                                setUser({
                                    ...userResult,
                                    admin: token.claims.admin,
                                    username: publicProfileDoc.id,
                                })
                            }

                            setLoading(false)
                        }
                    })*/
                }else{
                    setUser(null);
                }

                setLoading(false);
            })
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

    return { user, firebase, loading, userData }
}

export default useAuth
