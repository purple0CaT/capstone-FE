// import { Avatar, Dialog, Slide } from "@mui/material";
// import Button from "@mui/material/Button";
// import { TransitionProps } from "@mui/material/transitions";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// //
// const Transition = React.forwardRef(function Transition(
//   props: TransitionProps & {
//     children: React.ReactElement<any, any>;
//   },
//   ref: React.Ref<unknown>,
// ) {
//   return <Slide direction="down" ref={ref} {...props} />;
// });
// //
// function FollowerBtns({ FetchedUser, reFetch }: any) {
//   const tokens = useSelector((state: any) => state.tokens);
//   const user = useSelector((state: any) => state.user);
//   //
//   const [OpenFollowers, setOpenFollowers] = useState(false);
//   const [OpenFollowing, setOpenFollowing] = useState(false);
//   const [Following, setFollowing] = useState([]);
//   const [Followers, setFollowers] = useState([]);
//   //
//   const handleFollowers = () => {
//     setOpenFollowers(!OpenFollowers);
//   };
//   const handleFollowing = () => {
//     setOpenFollowing(!OpenFollowing);
//   };
//   //
//   const unFollow = async (id: string) => {
//     try {
//       const url = `${process.env.REACT_APP_FETCHURL}/follow/${id}`;
//       const res = await fetch(url, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${tokens.accessToken}` },
//       });
//       if (res.ok) {
//         reFetch();
//       } else {
//         console.log(res);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //
//   //
//   useEffect(() => {
//     FetchedUser.followers?.youFollow &&
//       setFollowing(FetchedUser.followers.youFollow);
//     FetchedUser.followers?.followers &&
//       setFollowers(FetchedUser.followers.followers);
//   }, [FetchedUser]);
//   return (
//     <>
//       <div
//         className="d-flex w-100 align-items-center justify-content-center"
//         style={{ gap: "2rem" }}
//       >
//         <Button
//           disabled={Followers.length > 0 ? false : true}
//           color="primary"
//           onClick={handleFollowers}
//         >
//           {" "}
//           <h6 className="font-weight-light m-0">
//             Followers {Followers.length}
//           </h6>
//         </Button>
//         <Button
//           disabled={Following.length > 0 ? false : true}
//           color="info"
//           onClick={handleFollowing}
//         >
//           {" "}
//           <h6 className="font-weight-light m-0">
//             Following {Following.length}
//           </h6>
//         </Button>
//       </div>
//       {/* Dialogs */}
//       <div>
//         <Dialog
//           open={OpenFollowers}
//           TransitionComponent={Transition}
//           keepMounted
//           onClose={handleFollowers}
//           aria-describedby="alert-dialog-slide-description"
//           sx={{
//             backdropFilter: "blur(2px)",
//           }}
//         >
//           <div className="d-flex flex-column p-3">
//             {Followers.length > 0 &&
//               Followers.map((F: any) => (
//                 <div
//                   className="d-flex align-items-center justify-content-between p-1"
//                   key={F._id + 131}
//                 >
//                   <Link
//                     to={`/profile/${F._id}`}
//                     className="d-flex align-items-center"
//                     style={{ minWidth: "13rem" }}
//                   >
//                     <Avatar
//                       alt={F.firstname + " " + F.lastname}
//                       src={F.avatar}
//                       sx={{ width: "2rem", height: "2rem" }}
//                     />
//                     <p className="m-0 ml-2">{F.firstname + " " + F.lastname}</p>
//                   </Link>
//                   <div></div>
//                 </div>
//               ))}
//           </div>
//         </Dialog>
//         <Dialog
//           open={OpenFollowing}
//           TransitionComponent={Transition}
//           keepMounted
//           onClose={handleFollowing}
//           aria-describedby="alert-dialog-slide-description"
//           sx={{
//             backdropFilter: "blur(2px)",
//           }}
//         >
//           <div className="d-flex flex-column p-3">
//             {Following.length > 0 &&
//               Following.map((F: any) => (
//                 <div
//                   className="d-flex align-items-center justify-content-between p-1"
//                   key={F._id + 321}
//                 >
//                   <Link
//                     to={`/profile/${F._id}`}
//                     className="d-flex align-items-center"
//                     style={{ minWidth: "13rem" }}
//                   >
//                     <Avatar
//                       alt={F.firstname + " " + F.lastname}
//                       src={F.avatar}
//                       sx={{ width: "2rem", height: "2rem" }}
//                     />
//                     <p className="m-0 ml-2">{F.firstname + " " + F.lastname}</p>
//                   </Link>
//                   {FetchedUser.user._id === user._id && (
//                     <div>
//                       <Button color="warning" onClick={() => unFollow(F._id)}>
//                         Unfollow
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               ))}
//           </div>
//         </Dialog>
//       </div>
//     </>
//   );
// }

// export default FollowerBtns;