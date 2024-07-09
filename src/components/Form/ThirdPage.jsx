const ThirdPage= ({ formData }) => {
    return (
      <div>
        <h1 className="text-2xl font-bold text-center mb-8">
            Submit Your Proposal Request!
            </h1>
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {formData.name}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Phone:</strong> {formData.phone}
          </p>
          <p>
            <strong>Comment:</strong> {formData.comment}
          </p>
        </div>
      </div>
    );
  };
  
  export default ThirdPage;
  