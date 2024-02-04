import React,{useState} from "react";
import "../css/avatar_select.css";
function AvatarSelector({handleClose}) {
    const imageCount = 15;
    const [imgArr, setImgArr] = useState(Array.from({ length: imageCount }, (_, index) => ({value: index+1, isSelected: false})))
    const handleClick = (e) => {
        e.preventDefault();
        const selected = imgArr.filter(img => img.isSelected === true);
        if(selected.length > 0) {
            handleClose(`../assets/profile-imgs/${selected[0].value}.png`)
        }else {
            alert("Please select Avatar")
        }

    }
    const handleAvatarSelect = (e, img) => {
        e.preventDefault();
        var isSelected = imgArr.filter( img => img.isSelected)
        console.log(isSelected)
        if(isSelected.length <= 0) {
            setImgArr(prevImgArr => {
                const updatedArr = [...prevImgArr];
                updatedArr[img.value - 1].isSelected = true;
                return updatedArr;
              });
            imgArr[img.value -1].isSelected = true;
            console.log("setted image to true", imgArr);
        }
        else if (isSelected.length > 0){
            setImgArr(prevImgArr => {
                const updatedArr = [...prevImgArr];
                updatedArr[isSelected[0].value - 1].isSelected = false;
                return updatedArr;
              });
              setImgArr(prevImgArr => {
                const updatedArr = [...prevImgArr];
                updatedArr[img.value - 1].isSelected = true;
                return updatedArr;
              });
        }

    }
  return (
    <div className="avatar-selector">
        <span>Select your Avatar</span>
        <section>
            {imgArr.map(image => (
                    <img key={image.value} src={require(`../assets/profile-imgs/${image.value}.png`)} alt={`Avatar ${image.value}`} onClick={(e) => handleAvatarSelect(e, image)} 
                    className={image.isSelected ? 'selected' : ""}
                    />
            )) }
        </section>
        <footer>
            <button className="btn-confirm" onClick={ (e) => handleClick(e)}>Confirm</button>
        </footer>
    </div>
  );
}

export default AvatarSelector;