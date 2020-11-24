import cv2
import os
import numpy as np
import dlib
from face_detector import FaceDetector


class FaceRecognizer:
    def __init__(self):
        self.face_detector = FaceDetector()
        # https://github.com/davisking/dlib-models
        self.sp = dlib.shape_predictor('./face_recognition/data/shape_predictor_5_face_landmarks.dat')
        self.facerec = dlib.face_recognition_model_v1('./face_recognition/data/dlib_face_recognition_resnet_model_v1.dat')

    def _get_face_feat(self, img_x, box):
        rec = dlib.rectangle(*box)
        shape = self.sp(img_x, rec)
        feat = self.facerec.compute_face_descriptor(img_x, shape)
        return feat

    def _face_distance(self, face_encodings, face_to_compare):
        """
        Given a list of face encodings, compare them to a known face encoding and get a euclidean distance
        for each comparison face. The distance tells you how similar the faces are.

        :param faces: List of face encodings to compare
        :param face_to_compare: A face encoding to compare against
        :return: A numpy ndarray with the distance for each face in the same order as the 'faces' array
        """
        if len(face_encodings) == 0:
            return np.empty((0))
        face_encodings = np.asarray(face_encodings)
        return np.linalg.norm(face_encodings - face_to_compare, axis=1)

    def _get_img_face_encoding(self, fpath):
        img_x = cv2.imread(fpath)
        img_x = cv2.cvtColor(img_x, cv2.COLOR_BGR2RGB)
        item = self.face_detector.detect(img_x)
        assert item is not None, 'can not find the face box,please check %s' % fpath
        box, _ = item
        return self._get_face_feat(img_x, box)

    def create_known_faces(self, root):
        self._known_faces = []
        self._know_name = []
        for i, fname in enumerate(os.listdir(root)):
            fpath = os.path.join(root, fname)
            self._known_faces.append(self._get_img_face_encoding(fpath))
            self._know_name.append(fname.split('.')[0])

    def recognize(self, image, score_threshold=0.6):
        if isinstance(image, str):
            image = cv2.imread(image)
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        item = self.face_detector.detect(image)
        if item:
            box, cls = item
            face_feat = self._get_face_feat(image, box)
            scores = 1 - self._face_distance(self._known_faces, face_feat)
            ix = np.argmax(scores).item()
            if scores[ix] > score_threshold:
                # 1 for mask
                return self._know_name[ix], box, 1 - int(cls), scores[ix]
            return None

    def test_100x(self):
        print('or_length', len(self._know_name))
        for i in range(7):
            self._know_name.extend(self._know_name)
            self._known_faces.extend(self._known_faces)
        print('10x_length', len(self._know_name))
