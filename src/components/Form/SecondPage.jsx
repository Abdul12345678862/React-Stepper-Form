import Input from "../UI/Input";
import TextArea from "../UI/TextArea";

const SecondPage = ({ formData, handleInputChange, errors }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-8">Details</h1>
      <p className="ext-2xl text-center mb-8">
        We’re thrilled at the opportunity to help you grow your business online.
        Please let us know the best way to reach you.
      </p>

      <Input
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        error={errors.name}
      />
      <div className="flex gap-1">
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
        />
        <Input
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          error={errors.phone}
        />
      </div>
      <TextArea
        label="Anything else you’d like to share?"
        name="comment"
        type="textarea"
        value={formData.comment}
        onChange={handleInputChange}
        error={errors.comment}
      />
    </div>
  );
};

export default SecondPage;
