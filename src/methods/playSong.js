// import { type } from '../context/Context';

// export default function playSong(
//     dispatch,
//     currentLocation,
//     currentList,
//     currentIndex,
// ) {
//     const audioPath = currentList[currentIndex].audioPath;
//     const song = new Audio(audioPath);

//     song.addEventListener('canplaythrough', () => {
//         console.log(song);
//     });

//     dispatch({
//         type: type.LOAD_SONG,
//         currentPlayingPath: currentLocation,
//         currentPlayingList: currentList,
//         currentPlayingSongIndex: currentIndex,
//     });
//     setTimeout(() => {
//         dispatch({ type: type.PLAY_SONG });
//     }, 1000);
// }
