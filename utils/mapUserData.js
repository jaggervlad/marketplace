export const mapUserData = async (user) => {
  const { uid, email, displayName, photoURL } = user
  const token = await user.getIdToken(true)

  return {
    id: uid,
    email,
    name: displayName,
    photoUrl: photoURL,
    provider: user.providerData[0].providerId,
    token,
  }
}
