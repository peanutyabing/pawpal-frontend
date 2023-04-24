import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useUser from "../Hooks/useUser.js";
import { storage } from "../Firebase.js";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import useAxiosPrivate from "../Hooks/useAxiosPrivate.js";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import { PersonFill, ArrowLeftShort } from "react-bootstrap-icons";
import Alerts from "./Alerts.js";

export default function UserProfileForm() {
  const { user } = useUser();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/account";
  const [profile, setProfile] = useState({
    imageUrl: "",
    country: "",
    region: "",
    cityTown: "",
  });
  const [imageFile, setImageFile] = useState("");
  const [imageInputValue, setImageInputValue] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertKey, setAlertKey] = useState("");

  useEffect(() => {
    setProfile((prevState) => ({
      ...prevState,
      imageUrl: user.imageUrl || "",
      country: user.country || "",
      region: user.region || "",
      cityTown: user.cityTown || "",
    }));
  }, [user]);

  const handleUpload = (e) => {
    setImageInputValue(e.target.value);
    setImageFile(e.target.files[0]);
  };

  useEffect(() => {
    uploadFile().then((imageUrl) => {
      setProfile((prevState) => ({ ...prevState, imageUrl }));
    });
  }, [imageFile]);

  const uploadFile = async () => {
    if (!imageFile) {
      return Promise.resolve("");
    }
    setShowAlert(true);
    setAlertKey("imageUploading");
    const fileRef = ref(storage, `user-profiles/${imageFile.name}`);
    return uploadBytes(fileRef, imageFile).then(() => getDownloadURL(fileRef));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosPrivate.put("/user-profile", profile);
      setShowAlert(true);
      setAlertKey("profileUpdated");
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div
          className="top-btn-container bold"
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowLeftShort />
          Back
        </div>
        <h1 className="large bold">Update your profile</h1>
        <div className="margin-tb-m">
          {user.username} | {user.email}
        </div>
        <div className="margin-tb-m">
          {profile.imageUrl ? (
            <img
              src={profile.imageUrl}
              alt={profile.username}
              className="profile-sm"
            />
          ) : (
            <PersonFill className="profile-sm" />
          )}
        </div>

        <Form className="margin-lr-m" onSubmit={handleSubmit}>
          <Form.Group className="margin-tb-m">
            <FloatingLabel className="dark" label="Profile photo">
              <Form.Control
                name="imageUrl"
                type="file"
                value={imageInputValue}
                onChange={handleUpload}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="margin-tb-m">
            <CountryDropdown
              className="geo-select"
              value={profile.country}
              priorityOptions={["SG", "HK", "divider"]}
              onChange={(selected) => {
                setProfile((prevState) => ({
                  ...prevState,
                  country: selected,
                }));
              }}
            />
          </Form.Group>
          <Form.Group className="margin-tb-m">
            <RegionDropdown
              className="geo-select"
              country={profile.country}
              value={profile.region}
              onChange={(selected) => {
                setProfile((prevState) => ({
                  ...prevState,
                  region: selected,
                }));
              }}
            />
          </Form.Group>
          <Form.Group className="margin-tb-m">
            <FloatingLabel label="City or town (optional)" className="dark">
              <Form.Control
                name="cityTown"
                type="text"
                value={profile.cityTown || ""}
                onChange={(e) => {
                  setProfile((prevState) => ({
                    ...prevState,
                    cityTown: e.target.value,
                  }));
                }}
                placeholder="City or town"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="margin-tb-m">
            <Button type="submit" variant="light">
              Submit
            </Button>
          </Form.Group>
        </Form>
        <Alerts
          showAlert={showAlert}
          hideAlert={() => {
            setShowAlert(false);
          }}
          alertKey={alertKey}
        />
      </header>
    </div>
  );
}
