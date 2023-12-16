package org.ets.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = { SlingHttpServletRequest.class,
		Resource.class }, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class ContactTableModel {
	
	@ValueMapValue
	private String title;

	@ValueMapValue
	private String fetchTitle;

	@ValueMapValue
	private String subtitle;

	@ValueMapValue
	private String note;

	@ValueMapValue
	private String center;
	
	@ValueMapValue
	private String tddAccess;

	@ValueMapValue
	private String clo;

	@ValueMapValue
	private String email;

	@ValueMapValue
	private String emailNote;

	@ValueMapValue
	private String phone;
	
	@ValueMapValue
	private String tollFreePhone;

	@ValueMapValue
	private String candidateCares;

	@ValueMapValue
	private String tty;

	@ValueMapValue
	private String fax;

	@ValueMapValue
	private String bureauOfCredentialing;
	
	@ValueMapValue
	private String physicalAddress;

	@ValueMapValue
	private String address;

	@ValueMapValue
	private String mail;

	@ValueMapValue
	private String nationalOffice;

	@ValueMapValue
	private String websiteURL;
	
	@ValueMapValue
	private String websiteTitle;
	
	@ValueMapValue
	private String department;

	@ValueMapValue
	private String departmentURL;

	@ValueMapValue
	private String hours;

	@ValueMapValue
	private String officeHours;

	public String getTitle() {
		return title;
	}

	public String getFetchTitle() {
		return fetchTitle;
	}

	public String getSubtitle() {
		return subtitle;
	}

	public String getNote() {
		return note;
	}

	public String getCenter() {
		return center;
	}

	public String getTddAccess() {
		return tddAccess;
	}

	public String getClo() {
		return clo;
	}

	public String getEmail() {
		return email;
	}

	public String getEmailNote() {
		return emailNote;
	}

	public String getPhone() {
		return phone;
	}

	public String getTollFreePhone() {
		return tollFreePhone;
	}

	public String getCandidateCares() {
		return candidateCares;
	}

	public String getTty() {
		return tty;
	}

	public String getFax() {
		return fax;
	}

	public String getBureauOfCredentialing() {
		return bureauOfCredentialing;
	}

	public String getPhysicalAddress() {
		return physicalAddress;
	}

	public String getAddress() {
		return address;
	}

	public String getMail() {
		return mail;
	}

	public String getNationalOffice() {
		return nationalOffice;
	}

	public String getWebsiteURL() {
		return websiteURL;
	}

	public String getWebsiteTitle() {
		return websiteTitle;
	}

	public String getDepartment() {
		return department;
	}

	public String getDepartmentURL() {
		return departmentURL;
	}

	public String getHours() {
		return hours;
	}

	public String getOfficeHours() {
		return officeHours;
	}
}
